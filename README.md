<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>


<h1>CREACIÓN DE MODELOS PARA USARIO Y ROLES</h1>
<br>
Para crear el modelo de Usuario y Roles instale la librería Spatie que se encargará de crear roles y asignar permisos a esos roles, asociando ambos desde la migraciones que se generarán automáticamente al publicar el provider de Spatie

1. composer require spatie/laravel-permission
2. php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider" (públicar provider (Obtener migración de la tabla permisos)) 
3. php artisan migrate (Para migrar la tabla permisos) 
4. Importar librerias en el modelo User (use Spatie\Permission\Traits\HasRoles;) y luego agregarle una nueva caracterísitca: use HasRoles
5. Crear nuevos roles, creando una nueva migración: php artisan make:migration create_roles 
6. Configurar archivo de migración, importando los siguiente modelos :
- use Spatie\Permission\Models\Role;
- use App\Models\User;

    $role1 = Role::create(['name' => 'admin']);
    $role2 = Role::create(['name' => 'empleado']);
    $user -> assignRole($role1);
7. Realizar Migración para crear los roles ya asignar el rol "admin" al primer usuario

8. Configurar app.php de la carpeta bootstrap:
$middleware->alias([
            'role' => RoleMiddleware::class,
            'permision' => PermissionMiddleware::class,
            'role_or_permission' => RoleOrPermissionMiddleware::class,
]);

9. Configurar controladores, ejm:
public function index()
    {
        return Inertia::render('Admin1/Admin');
    }

10. Configurar ruta, ejm:
Route::group(['middleware' => ['auth', 'verified', 'role:admin']], function () {  
    Route::get('/admin', [AdminController::class, 'index'])->name('admin');
});


/*Otros*/
<br>
php artisan permission:create-role nombre-rol (Crear nuevo rol)
php artisan permission:show (Mostrar roles)
    
