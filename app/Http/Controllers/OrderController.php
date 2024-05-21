<?php

namespace App\Http\Controllers;

use App\Cbrs;
use App\Http\Resources\OrderResource;
use App\Http\Resources\TechnicianResource;
use App\Models\Order;
use App\Models\Technicians;
use App\Models\User;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function show(User $user)
    {
        return inertia("Orders/Show", ["user" => $user]);
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
        $orderSmiliarty = Order::where('user_id', auth()->id())->orderBy('created_at', 'desc')->first();
        if (!empty($orderSmiliarty)) {
            $data = [];
            foreach (Technicians::all() as $row) {
                $data[$row->id] = $this->pre_process($row->skill->name . ' ' . $row->skill_description);
            }
            $cbrs = new Cbrs();
            $cbrs->create_index($data);
            $cbrs->idf();
            $w = $cbrs->weight();
            $r = $cbrs->similarity($orderSmiliarty->technician_id);
            $n = 8;
            foreach ($r as $k => $row) {
                $rekomendasi[] =
                    Technicians::where('id', $k)->first();
            }
        }

        $rekomendasi =   TechnicianResource::collection(collect($rekomendasi)->take(8));

        $technicians = TechnicianResource::collection($query->paginate(8));

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
