<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use Illuminate\Http\Request;

class ApproveController extends Controller
{
    public function index()
    {

        $orders = OrderResource::collection(Order::where('status', 'accepted')->paginate(10));

        return inertia("Admin/Approve/Page", ["orders" => $orders]);
    }
}
