<?php

namespace App\Http\Controllers;

use App\Cbrs;
use App\Http\Resources\OrderResource;
use App\Http\Resources\TechnicianResource;
use App\Models\ClickDetail;
use App\Models\Order;
use App\Models\Technicians;
use App\Models\User;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function destroy(Order $order)
    {
        $order->delete();
        return back();
    }
    public function show(User $user)
    {

        $orderSmiliarty = Technicians::where('user_id', $user->id)->first();

        $clickDetail = ClickDetail::where('user_id', auth()->id())->first();
        $implode = "";
        if (!empty($clickDetail)) {
            $skillSebelumnya = $clickDetail->text;
            $implode = $skillSebelumnya . " " . $orderSmiliarty->skill->name;
            $clickDetail->update(["text" => $implode]);
        } else {
            $clickDetail = ClickDetail::create([
                'user_id' => auth()->id(),
                'text' => ""
            ]);
            $skillSebelumnya = $clickDetail->text;
            $implode = $skillSebelumnya . " " . $orderSmiliarty->skill->name;
            $clickDetail->update(["text" => $implode]);
        }

        $data = [];

        foreach (Technicians::all() as $row) {
            $data[$row->id] = $this->pre_process($row->skill->name . ' ' . $row->skill_description);
        }
        $data["search"] = $implode;
        $cbrs = new Cbrs();
        $cbrs->create_index($data);
        $cbrs->idf();
        $w = $cbrs->weight();
        $r = $cbrs->similarity("search");
        $n = 8;
        foreach ($r as $k => $row) {
            $tech = Technicians::where('id', $k)->first();
            if (!empty($tech)) {
                $rekomendasi[] = $tech;
            }
        }
        $rekomendasi =   TechnicianResource::collection(collect($rekomendasi ?? [])->take(8));
        $technician = Technicians::where('user_id', $user->id)->first();
        $jumlahOrderTukang = Order::where('technician_id', $technician->id)->count();
        Technicians::where('user_id', $user->id)->increment("visit");

        return inertia("Orders/Show", ["user" => $user, "rekomendasi" => $rekomendasi, "technician" => $technician, "jumlahOrderTukang" => $jumlahOrderTukang]);
    }
    public function index()
    {
        $orders = OrderResource::collection(Order::where('user_id', auth()->id())->paginate(10));
        return inertia("Orders/Page", ["orders" => $orders, "search" => request('search') ?? null]);
    }
    function pre_process($str)
    {
        $stemmerFactory = new \Sastrawi\Stemmer\StemmerFactory();
        $stemmer = $stemmerFactory->createStemmer();

        $stopWordRemoverFactory = new \Sastrawi\StopWordRemover\StopWordRemoverFactory();
        $stopword = $stopWordRemoverFactory->createStopWordRemover();

        $str = strtolower($str);
        $str = $stemmer->stem($str);
        $str = $stopword->remove($str);

        return $str;
    }

    public function create(Request $request)
    {
        $query = Technicians::query();
        $orderSmiliarty = Order::where('user_id', auth()->id())->orderBy('created_at', 'desc')->get();

        if ($orderSmiliarty->count() > 0) {
            $implode = "";
            foreach ($orderSmiliarty as $order) {
                $implode .= $order->technician->skill->name . " ";
            }

            $data = [];
            foreach (Technicians::all() as $row) {
                $data[$row->id] = $this->pre_process($row->skill->name . ' ' . $row->skill_description);
            }
            $data["search"] = $implode;
            $cbrs = new Cbrs();
            $cbrs->create_index($data);
            $cbrs->idf();

            $r = $cbrs->similarity("search");

            foreach ($r as $k => $row) {
                $tech = Technicians::where('id', $k)->first();
                if (!empty($tech)) {
                    $rekomendasi[] = $tech;
                }
            }
        }

        $rekomendasi =   TechnicianResource::collection(collect($rekomendasi ?? [])->take(8));


        $technicians = TechnicianResource::collection($query->paginate(8));
        if ($request->search) {
            $data = [];
            foreach (Technicians::all() as $row) {
                $data[$row->id] = $this->pre_process($row->user->name . ' ' . $row->skill->name . ' ' . $row->skill_description);
            }
            $data["search"] = $request->search;
            $cbrs = new Cbrs();
            $cbrs->create_index($data);
            $cbrs->idf();
            $w = $cbrs->weight();
            $r = $cbrs->similarity("search");

            array_shift($r);
            $rekomendasi = [];


            foreach ($r as $k => $row) {
                if ($row == 0) {
                    break;
                }
                $rekomendasi[] =
                    Technicians::where('id', $k)->first();
            }
        }

        $rekomendasi =   TechnicianResource::collection(collect($rekomendasi ?? [])->take(8));
        return inertia("Orders/Create", ["technicians" => $technicians, "search" => $request->search ?? "", "rekomendasi" => $rekomendasi]);
    }

    public function store(Request $request)
    {

        Order::create([
            'user_id' => auth()->id(),
            "technician_id" => $request->technician_id
        ]);

        return redirect()->route("orders.index")->with("message", "Berhasil tambah pesanan");;
    }
}
