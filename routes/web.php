<?php

use App\Http\Controllers\Admin\ApproveController as AdminApproveController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\ApproveController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use App\Models\Order;
use App\Models\Technicians;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {

    if (auth()->user()->hasRole(['admin', 'super'])) {
        $users = User::role('user');
        $technicians = User::role('technician');
        $orders = Order::query();
        return Inertia::render('Dashboard', [
            "users" => [
                "countGenderMale" => $users->where('gender', 'male')->count(),
                "countGenderFemale" => User::where('gender', 'female')->count(),
                "count" => $users->count(),
                "countFromLastYear" => $users->whereYear('created_at', now()->format('Y'))->count(),
            ],
            "technicians" => [
                "count" => $technicians->count(),
                "countFromLastYear" => $technicians->whereYear('created_at', now()->format('Y'))->count(),
            ],
            "orders" => [
                "count" => $orders->count(),
                "countFromLastYear" => $orders->whereYear('created_at', now()->format('Y'))->count(),
            ]
        ]);
    }
    if (auth()->user()->hasRole('user')) {
        $orders = Order::where('user_id', auth()->id());
        return inertia("Customer/Dashboard", ["orders" => [
            "count" => $orders->count(),
            "countFromLastYear" => $orders->whereYear('created_at', now()->format('Y'))->count(),
        ]]);
    }
    if (auth()->user()->hasRole('technician')) {
        $orders = Order::where('technician_id', Technicians::where('user_id', auth()->id())->first()->id);
        return inertia("Customer/Dashboard", ["orders" => [
            "count" => $orders->count(),
            "countFromLastYear" => $orders->whereYear('created_at', now()->format('Y'))->count(),
        ]]);
    }
    Auth::guard('web')->logout();
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');

    Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');
    Route::get('/orders/create', [OrderController::class, 'create'])->name('orders.create');
    Route::get('/orders/user/{user}', [OrderController::class, 'show'])->name('orders.show');

    Route::get('/approve', [ApproveController::class, 'index'])->name('approve.index');
    Route::patch('/approve/success/{order}', [ApproveController::class, 'success'])->name('approve.success');
    Route::patch('/approve/decline/{order}', [ApproveController::class, 'decline'])->name('approve.decline');

    Route::middleware(['role:admin|super'])->group(function () {
        Route::controller(\App\Http\Controllers\Admin\TechnicianController::class)->group(function () {
            Route::get('/admin/technicians', 'index')->name('admin.technicians.index');
            Route::get('/admin/technicians/create', 'create')->name('admin.technicians.create');
            Route::post('/admin/technicians', 'store')->name('admin.technicians.store');
            Route::get('/admin/technicians/{technician}/edit', 'edit')->name('admin.technicians.edit');
            Route::post('/admin/technicians/{technician}', 'update')->name('admin.technicians.update');
            Route::delete('/admin/technicians/{technician}', 'destroy')->name('admin.technicians.destroy');
        });

        Route::controller(\App\Http\Controllers\Admin\UserController::class)->group(function () {
            Route::get('/admin/users', 'index')->name('admin.users.index');
            Route::get('/admin/users/create', 'create')->name('admin.users.create');
            Route::post('/admin/users', 'store')->name('admin.users.store');
            Route::get('/admin/users/{user}/edit', 'edit')->name('admin.users.edit');
            Route::post('/admin/users/{user}', 'update')->name('admin.users.update');
            Route::delete('/admin/users/{user}', 'destroy')->name('admin.users.destroy');
        });

        Route::get('/admin/approve', [AdminApproveController::class, 'index'])->name('admin.approve.index');
    });

    Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications.index');
    Route::get('/activities', [NotificationController::class, 'index'])->name('activities.index');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
