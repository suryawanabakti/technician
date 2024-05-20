<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Models\Technicians;
use App\Models\User;
use Illuminate\Http\Request;

class ApproveController extends Controller
{
    public function index()
    {

        $orders = OrderResource::collection(Order::where('technician_id', Technicians::where('user_id', auth()->id())->first()->id)->paginate(10));

        return inertia("Technician/Approve/Page", ["orders" => $orders]);
    }

    public function success(Order $order)
    {
        $order->update(['status' => 'accepted']);
        return back()->with('message', 'Berhasil menerima pesanan' . $order->user->name);
    }

    public function decline(Order $order)
    {
        $order->update(['status' => 'decline']);
        return back()->with('message', 'Berhasil menolak pesanan' . $order->user->name);
    }
}
