<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderResource;
use App\Http\Resources\TechnicianResource;
use App\Models\Order;
use App\Models\Technicians;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    //
    public function index()
    {
        $orders = OrderResource::collection(Order::where('user_id', auth()->id())->paginate(10));
        return inertia("Orders/Page", ["orders" => $orders, "search" => request('search') ?? null]);
    }

    public function create()
    {
        $technicians = TechnicianResource::collection(Technicians::orderBy('updated_at', 'desc')->paginate(8));
        return inertia("Orders/Create", ["technicians" => $technicians]);
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
