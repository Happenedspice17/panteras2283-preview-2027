# Instalación (costo: $0)

Todo corre en planes gratuitos: **Supabase Free** (base de datos, login, 500 MB) y **GitHub Pages** (hosting). Lo único opcional con costo son los asistentes de IA (API de Anthropic, centavos de dólar por conversación); sin llave funcionan en modo "copiar prompt".

## 1. Supabase
1. Crea cuenta en supabase.com → *New project* (región `us-east-1` o la más cercana).
2. *SQL Editor* → pega y ejecuta en orden:
   1. `supabase/migrations/0001_schema.sql`
   2. `supabase/seed.sql` (temporada 2027, calendario, checklist de pits, quiz de seguridad)
   3. `supabase/seed_practicas.sql` (plan de prácticas por área y nivel)
3. *Authentication → Providers → Google*: actívalo. Necesitas un OAuth Client en Google Cloud Console (tipo *Web*), con redirect `https://<proyecto>.supabase.co/auth/v1/callback`. Si la prepa usa Google Workspace, los alumnos entran con su cuenta escolar.
4. *Authentication → URL Configuration*: agrega la URL de GitHub Pages (`https://<usuario>.github.io/<repo>/`) y `http://localhost:5173` en *Redirect URLs*.
5. *Project Settings → API*: copia `Project URL` y `anon public key`.

## 2. Primer coach
Entra a la app con tu cuenta (quedarás como *pendiente*). En Supabase *SQL Editor*:
```sql
update profiles set role = 'coach', is_minor = false where email = 'tu-correo@dominio.com';
```
Desde ahí apruebas a los demás en **Equipo y roles**. Un alumno menor no puede activarse sin marcar el consentimiento del tutor.

## 3. Local
```bash
cp .env.example .env.local   # pega URL y anon key
npm install
npm run dev
```

## 4. Publicar (GitHub Pages)
1. Repo → *Settings → Pages → Source: GitHub Actions*.
2. *Settings → Secrets and variables → Actions*: `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`.
3. Cada push a `main` publica la app (`.github/workflows/deploy.yml`).

La anon key es pública por diseño; la seguridad la dan las políticas RLS del esquema.

## 5. Asistentes de IA (opcional)
```bash
npx supabase login
npx supabase link --project-ref <ref>
npx supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
npx supabase functions deploy asistente
```
Pon un límite de gasto mensual en console.anthropic.com. Sin esto, la página de asistentes ofrece copiar el prompt para usarlo en un chat gratuito.

## 6. Respaldos
Plan gratis no incluye respaldos automáticos descargables: una vez por mes, *Database → Backups* o `npx supabase db dump -f respaldo.sql`, y guárdalo en el Drive del equipo.

## Nueva temporada
Inserta una fila en `seasons` con `current = true` (y pon `false` a la anterior), luego carga su calendario en **Calendario**.
