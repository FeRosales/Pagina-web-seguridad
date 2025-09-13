# Mi proyecto de Next.js y MongoDB

Esta es una página web para buscar trabajo, donde los usuarios pueden registrarse, iniciar sesión y ver su dashboard con ofertas de trabajo. También hay un rol de administrador con un dashboard especial que permite editar las ofertas y cosas por el estilo.

## Qué puedes hacer en la página
- Ver la landing page pública
- Registrarte como usuario normal
- Registrarte como administrador si tienes la clave secreta
- Iniciar sesión y entrar al dashboard correspondiente
- Los dashboards muestran información diferente según tu rol

---

## Cómo correr el proyecto

1. Clona el repositorio:
   bash
git clone https://github.com/FeRosales/Pagina-web-seguridad.git
cd Pagina-web-seguridad
Instala las dependencias con: npm install
Crea un archivo .env.local en la raíz con estos datos:
MONGODB_URI=mongodb+srv://<usuario>:<password>@cluster0.xxx.mongodb.net/
JWT_SECRET=unaClaveParaFirmarTokens
ADMIN_SECRET=laClaveParaAdmin
y pra correr el proyecto npm run dev
Luego se abre http://localhost:3000 y ya corre
