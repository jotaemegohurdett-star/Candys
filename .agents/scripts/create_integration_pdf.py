from pathlib import Path
import fitz


OUT = Path(".agents/outputs/candys-pet-organigrama-integraciones.pdf")
W, H = 792, 612  # Letter landscape, suitable for diagrams and printing.
BLACK = (0, 0, 0)
GRAY = (0.35, 0.35, 0.35)
LIGHT = (0.82, 0.82, 0.82)
VERY_LIGHT = (0.94, 0.94, 0.94)


def text_width(text, size, bold=False):
    return fitz.get_text_length(text, fontname="hebo" if bold else "helv", fontsize=size)


def wrap(text, width, size, bold=False):
    lines = []
    for paragraph in str(text).split("\n"):
        if not paragraph:
            lines.append("")
            continue
        words = paragraph.split()
        current = ""
        for word in words:
            candidate = f"{current} {word}".strip()
            if current and text_width(candidate, size, bold) > width:
                lines.append(current)
                current = word
            else:
                current = candidate
        if current:
            lines.append(current)
    return lines


def add_text(page, text, x, y, width, size=8.5, line_h=None, bold=False,
             color=BLACK, max_height=None, align=0):
    line_h = line_h or size * 1.28
    lines = wrap(text, width, size, bold)
    max_lines = len(lines)
    if max_height is not None:
        max_lines = max(1, int(max_height // line_h))
        if len(lines) > max_lines:
            lines = lines[:max_lines]
            if lines:
                last = lines[-1]
                while last and text_width(last + "...", size, bold) > width:
                    last = last.rsplit(" ", 1)[0] if " " in last else last[:-1]
                lines[-1] = (last or "...") + "..."
    font = "hebo" if bold else "helv"
    for line in lines:
        page.insert_text((x, y + size), line, fontname=font, fontsize=size, color=color)
        y += line_h
    return y


def box(page, x, y, w, h, title, body="", title_size=8.3, body_size=7.3,
        border=BLACK, fill=None, title_center=False):
    page.draw_rect(fitz.Rect(x, y, x + w, y + h), color=border,
                   fill=fill, width=0.8)
    title_y = y + 5
    title_x = x + 6
    if title_center:
        tw = text_width(title, title_size, True)
        title_x = x + max(5, (w - tw) / 2)
    page.insert_text((title_x, title_y + title_size), title,
                     fontname="hebo", fontsize=title_size, color=BLACK)
    if body:
        add_text(page, body, x + 6, y + 8 + title_size, w - 12,
                 size=body_size, line_h=body_size * 1.25,
                 max_height=h - 14 - title_size)


def arrow(page, x1, y1, x2, y2, label=None, dashed=False):
    page.draw_line((x1, y1), (x2, y2), color=BLACK, width=0.85,
                   dashes="[2 2]" if dashed else None)
    dx, dy = x2 - x1, y2 - y1
    length = max((dx * dx + dy * dy) ** 0.5, 1)
    ux, uy = dx / length, dy / length
    px, py = -uy, ux
    size = 5
    points = [
        (x2, y2),
        (x2 - ux * size + px * size * 0.6, y2 - uy * size + py * size * 0.6),
        (x2 - ux * size - px * size * 0.6, y2 - uy * size - py * size * 0.6),
    ]
    page.draw_polyline(points + [points[0]], color=BLACK, fill=BLACK, width=0.5)
    if label:
        mx, my = (x1 + x2) / 2, (y1 + y2) / 2
        page.insert_text((mx + 3, my - 3), label, fontname="helv",
                         fontsize=6.6, color=GRAY)


def header(page, title, subtitle, number):
    page.insert_text((34, 30), "CANDY'S PET | ARQUITECTURA E INTEGRACIONES",
                     fontname="hebo", fontsize=8.5, color=BLACK)
    page.insert_text((34, 49), title, fontname="hebo", fontsize=17, color=BLACK)
    add_text(page, subtitle, 34, 57, 620, size=8.2, color=GRAY, max_height=24)
    page.draw_line((34, 78), (758, 78), color=BLACK, width=0.7)
    page.insert_text((735, 30), f"{number:02d}", fontname="hebo", fontsize=9, color=BLACK)


def footer(page, number):
    page.draw_line((34, 584), (758, 584), color=LIGHT, width=0.6)
    page.insert_text((34, 598), "Documento privado de aprendizaje. No incluye valores de secretos, tokens ni credenciales.",
                     fontname="helv", fontsize=6.4, color=GRAY)
    page.insert_text((730, 598), str(number), fontname="helv", fontsize=6.4, color=GRAY)


def section_label(page, text, x, y, w):
    page.draw_rect(fitz.Rect(x, y, x + w, y + 17), color=BLACK,
                   fill=VERY_LIGHT, width=0.7)
    page.insert_text((x + 6, y + 12), text.upper(), fontname="hebo",
                     fontsize=8, color=BLACK)


def bullet_block(page, x, y, w, title, body, size=7.9):
    page.insert_text((x, y + size), "*", fontname="hebo", fontsize=size, color=BLACK)
    y = add_text(page, title, x + 10, y, w - 10, size=size, bold=True,
                 line_h=size * 1.2)
    return add_text(page, body, x + 10, y + 1, w - 10, size=size,
                    line_h=size * 1.22)


def table(page, x, y, widths, rows, row_h=27, header_size=7.1, body_size=6.7):
    total = sum(widths)
    cy = y
    for r, row in enumerate(rows):
        rh = row_h
        if r > 0:
            max_lines = 1
            for idx, cell in enumerate(row):
                max_lines = max(max_lines, len(wrap(cell, widths[idx] - 8, body_size)))
            rh = max(row_h, max_lines * body_size * 1.18 + 8)
        cx = x
        fill = VERY_LIGHT if r == 0 else None
        for idx, cell in enumerate(row):
            page.draw_rect(fitz.Rect(cx, cy, cx + widths[idx], cy + rh),
                           color=BLACK, fill=fill, width=0.45)
            add_text(page, cell, cx + 4, cy + 4, widths[idx] - 8,
                     size=header_size if r == 0 else body_size,
                     line_h=(header_size if r == 0 else body_size) * 1.18,
                     bold=(r == 0), max_height=rh - 7)
            cx += widths[idx]
        cy += rh
    return cy


def new_page(doc, title, subtitle):
    page = doc.new_page(width=W, height=H)
    number = len(doc)
    header(page, title, subtitle, number)
    footer(page, number)
    return page


def page_cover(doc):
    page = doc.new_page(width=W, height=H)
    page.insert_text((42, 61), "CANDY'S PET", fontname="hebo", fontsize=25, color=BLACK)
    page.insert_text((42, 90), "Organigrama técnico de integraciones", fontname="hebo",
                     fontsize=20, color=BLACK)
    add_text(page,
             "Mapa completo de arquitectura, configuración y recorridos de datos. "
             "Diseñado para imprimir en blanco y negro y estudiar cómo repetir el patrón en otro proyecto.",
             42, 105, 500, size=10, line_h=13, color=GRAY)
    page.draw_line((42, 145), (750, 145), color=BLACK, width=1)
    page.insert_text((42, 166), "ORGANIGRAMA GENERAL", fontname="hebo", fontsize=10, color=BLACK)

    # Delivery lane
    box(page, 50, 195, 128, 60, "REPLIT", "Desarrollo, workflows, preview y secretos administrados", fill=None)
    box(page, 220, 195, 128, 60, "GITHUB", "Repositorio remoto, rama main y origen del deploy", fill=None)
    box(page, 390, 195, 150, 60, "VERCEL", "CDN, funciones, salida estática y producción", fill=None)
    box(page, 585, 195, 150, 60, "DOMINIO PÚBLICO", "Navegador, tienda, API y video embebido", fill=None)
    arrow(page, 178, 225, 220, 225, "push")
    arrow(page, 348, 225, 390, 225, "deploy")
    arrow(page, 540, 225, 585, 225, "HTTPS")

    # Runtime lane
    box(page, 50, 317, 126, 66, "NAVEGADOR", "React/Vite, carrito local, admin y checkout", fill=None)
    box(page, 220, 317, 145, 66, "STOREFRONT", "Candy's Pet /; iframe /candys-pet-video/", fill=None)
    box(page, 410, 317, 132, 66, "API EXPRESS", "/api; CORS; cookies; rutas públicas y admin", fill=None)
    box(page, 585, 317, 150, 66, "POSTGRESQL", "Catálogo, stock, órdenes, settings e imágenes", fill=None)
    arrow(page, 176, 350, 220, 350, "render")
    arrow(page, 365, 350, 410, 350, "fetch")
    arrow(page, 542, 350, 585, 350, "Drizzle/pg")

    # External branches
    box(page, 88, 449, 130, 55, "MERCADO PAGO", "Preferencia, checkout y webhook", fill=None)
    box(page, 250, 449, 130, 55, "STORAGE", "Vercel Blob o Replit/GCS", fill=None)
    box(page, 412, 449, 130, 55, "WHATSAPP", "Fallback comercial por enlace wa.me", fill=None)
    box(page, 574, 449, 130, 55, "REDES / FUENTES", "Instagram, TikTok, Google Fonts", fill=None)
    arrow(page, 410, 383, 153, 449, "pago")
    arrow(page, 450, 383, 315, 449, "imágenes")
    arrow(page, 330, 383, 477, 449, "fallback")
    arrow(page, 286, 317, 639, 449, "recursos", dashed=True)

    add_text(page,
             "Lectura rápida: el navegador habla con el storefront; el storefront consume el API; "
             "el API persiste en PostgreSQL y coordina Mercado Pago y storage. GitHub no procesa pedidos: "
             "solo transporta código hacia Vercel. Cloudflare aparece como integración instalada, pero no es "
             "parte del flujo de negocio observado. Supabase y Stripe no están activos en el estado actual.",
             42, 528, 700, size=7.6, line_h=9.5, color=GRAY, max_height=38)
    footer(page, 1)


def page_deployment(doc):
    page = new_page(doc, "1. Estructura de ejecución y despliegue",
                    "Qué corre en Replit, qué se publica en Vercel y cómo viaja una mejora hasta producción.")
    section_label(page, "Monorepo y artifacts", 34, 95, 350)
    add_text(page,
             "El repositorio es un monorepo pnpm con Node 24 y TypeScript 5.9. "
             "La aplicación se separa en cuatro artifacts: API Server (/api, puerto local 8080), "
             "Candy's Pet (/ y puerto 25253), candys-pet-video (/candys-pet-video/ y puerto 26272) "
             "y mockup-sandbox (/__mockup, puerto 8081). Los workflows de Replit sirven preview y desarrollo; "
             "el mockup no aparece en la salida productiva de Vercel.",
             34, 119, 350, size=8.1, line_h=10.4, max_height=85)
    section_label(page, "Cadena de publicación", 408, 95, 350)
    box(page, 420, 126, 95, 48, "1. Replit", "Editar, validar y crear commit", body_size=6.8)
    box(page, 542, 126, 95, 48, "2. GitHub", "push a main", body_size=6.8)
    box(page, 664, 126, 80, 48, "3. Vercel", "build y alias", body_size=6.8)
    arrow(page, 515, 150, 542, 150)
    arrow(page, 637, 150, 664, 150)
    add_text(page, "La credencial Git de Replit y el conector GitHub son caminos distintos. "
             "Un OAuth válido puede permitir lectura y no permitir escritura; nunca se deben poner tokens en el código.",
             420, 187, 324, size=7.4, line_h=9.2, color=GRAY, max_height=45)
    section_label(page, "Vercel: configuración de build y routing", 34, 229, 724)
    add_text(page,
             "vercel.json instala con pnpm install --frozen-lockfile. El build compila el API dos veces "
             "(build y build:vercel), compila el video con BASE_PATH=/candys-pet-video/, compila el storefront "
             "con BASE_PATH=/ y copia el dist/public del video dentro de artifacts/candys-pet/dist/public/candys-pet-video. "
             "El outputDirectory final es artifacts/candys-pet/dist/public. La función api/index.js tiene maxDuration 60 s; "
             "el entrypoint carga dinámicamente el bundle ESM precompilado para evitar el choque CJS/ESM.",
             34, 253, 724, size=8.1, line_h=10.5, max_height=68)
    table(page, 34, 340, [145, 190, 175, 214], [
        ["Componente", "Entrada", "Salida / ruta", "Razón"],
        ["API", "Express + esbuild", "api/index.js -> /api/*", "Función serverless y bundle ESM"],
        ["Storefront", "Vite + React", "dist/public/index.html", "SPA pública y fallback"],
        ["Video", "Vite + BASE_PATH", "/candys-pet-video/", "Iframe estático independiente"],
        ["Mockup", "Vite local", "/__mockup", "Diseño y preview; no producción"],
    ], row_h=28)
    section_label(page, "Cloudflare, Vercel y límites de alcance", 34, 511, 724)
    add_text(page,
             "Cloudflare y Vercel aparecen como integraciones instaladas del workspace. La arquitectura observada "
             "usa Vercel para publicar y no necesita modificar DNS de Cloudflare para el flujo de negocio. No hay "
             "workflow GitHub Actions detectado; la automatización documentada es la integración nativa GitHub -> Vercel.",
             34, 535, 724, size=7.8, line_h=9.5, max_height=35)


def page_runtime(doc):
    page = new_page(doc, "2. Flujo de navegación, API y base de datos",
                    "La ruta normal desde una visita hasta catálogo, stock, carrito y consulta de orden.")
    section_label(page, "Recorrido principal", 34, 95, 724)
    box(page, 45, 125, 125, 55, "NAVEGADOR", "Carga React/Vite; conserva carrito en localStorage", body_size=6.8)
    box(page, 205, 125, 125, 55, "GET /api/catalog", "settings + product_images + stock", body_size=6.8)
    box(page, 365, 125, 125, 55, "GET /api/stock", "mapa producto-talla; refresco 60 s", body_size=6.8)
    box(page, 525, 125, 125, 55, "POST /api/payment", "checkout, orden y preferencia", body_size=6.8)
    box(page, 675, 125, 83, 55, "DB", "PostgreSQL", body_size=6.8)
    arrow(page, 170, 152, 205, 152, "fetch")
    arrow(page, 330, 152, 365, 152)
    arrow(page, 490, 152, 525, 152)
    arrow(page, 650, 152, 675, 152, "write")
    section_label(page, "Qué guarda PostgreSQL", 34, 215, 350)
    add_text(page,
             "* stock: producto/talla, nombre, cantidad y timestamp.\n"
             "* settings: claves y valores de precios.\n"
             "* product_images: URL, color y posición de galería.\n"
             "* orders: UUID, preference/payment de Mercado Pago, estado, snapshot JSONB del carrito, total y comprador.\n"
             "La conexión usa DATABASE_URL, pg y Drizzle ORM; el esquema se empuja a desarrollo con el comando db push.",
             34, 239, 350, size=8, line_h=10.2, max_height=145)
    section_label(page, "Contrato de API y fallbacks", 408, 215, 350)
    add_text(page,
             "* GET /api/healthz devuelve {status: ok} y sirve como health check.\n"
             "* catalog y stock son públicos por diseño.\n"
             "* useCatalog y useStock conservan defaults si el API falla; esto evita una pantalla vacía, "
             "pero puede mostrar precios o disponibilidad stale.\n"
             "* El carrito vive en el browser: productId, talla, color, precio y cantidad. No existe orden hasta iniciar el checkout.\n"
             "* GET /api/payment/order/:orderId existe, pero PaymentResult no lo usa: la pantalla de retorno se basa en query params.",
             408, 239, 350, size=8, line_h=10.2, max_height=145)
    section_label(page, "Lección reusable", 34, 384, 724)
    add_text(page,
             "Separar lectura pública, mutaciones autenticadas y persistencia ayuda a razonar el sistema. "
             "El frontend puede optimizar UX, pero el API debe volver a validar stock, precio, identidad de la orden "
             "y estados antes de escribir. Una respuesta 200 no significa que una mutación haya terminado: la UI debe "
             "actualizar o consultar el resultado real después de navegar o recargar.",
             34, 408, 724, size=8.3, line_h=10.6, max_height=72)
    table(page, 34, 495, [170, 180, 180, 194], [
        ["Capa", "Responsabilidad", "Entrada", "Salida"],
        ["Browser", "Interacción y estado temporal", "Clicks, localStorage, query", "fetch, redirect, links"],
        ["Express", "Reglas, auth y orquestación", "JSON, cookies, webhook", "JSON, redirect, DB writes"],
        ["PostgreSQL", "Fuente de verdad", "Drizzle queries", "rows, order state, stock"],
    ], row_h=27)


def page_payment(doc):
    page = new_page(doc, "3. Mercado Pago y caminos de compra",
                    "Checkout Pro, webhook, estados de orden y fallback comercial.")
    section_label(page, "Flujo Mercado Pago", 34, 95, 724)
    box(page, 42, 128, 122, 58, "CARRITO", "Artículos, precios, despacho y back_url", body_size=6.7)
    box(page, 198, 128, 142, 58, "API /preference", "Valida stock, calcula envío, crea orden pending", body_size=6.7)
    box(page, 374, 128, 128, 58, "MERCADO PAGO", "Checkout Pro e init_point", body_size=6.7)
    box(page, 536, 128, 105, 58, "WEBHOOK", "Consulta data.id en MP", body_size=6.7)
    box(page, 675, 128, 83, 58, "ORDEN", "estado + stock", body_size=6.7)
    arrow(page, 164, 157, 198, 157, "POST")
    arrow(page, 340, 157, 374, 157)
    arrow(page, 502, 157, 536, 157, "event")
    arrow(page, 641, 157, 675, 157, "DB")
    section_label(page, "Configuración y estados", 34, 220, 350)
    add_text(page,
             "La dependencia mercadopago crea preferencias con MP_ACCESS_TOKEN en el servidor. "
             "Sin esa variable, la API responde 503 MP_NOT_CONFIGURED y el frontend deriva a WhatsApp. "
             "El frontend redirige a init_point y vuelve con payment=success|failure|pending. "
             "El webhook consulta el pago directamente en Mercado Pago, usa external_reference como orderId, "
             "guarda payer/status/payment y descuenta stock cuando el pago es aprobado. La orden evita repetir el descuento si llega otra aprobación.",
             34, 244, 350, size=7.9, line_h=10.1, max_height=150)
    section_label(page, "Fallbacks y lo que no está implementado", 408, 220, 350)
    add_text(page,
             "Transferencia bancaria, retiro presencial, consultas y pedidos personalizados abren enlaces wa.me con "
             "el texto del carrito. WhatsApp no tiene API, webhook ni almacenamiento en el backend. "
             "MP_PUBLIC_KEY aparece como secreto disponible del entorno, pero no se observó uso en el código actual; "
             "el checkout usa el token de servidor. No hay Stripe activo: solo aparece en historial como integración antigua.",
             408, 244, 350, size=7.9, line_h=10.1, max_height=150)
    section_label(page, "Cuidado antes de reutilizar", 34, 407, 724)
    table(page, 34, 431, [182, 260, 282], [
        ["Punto", "Estado observado", "Mejor práctica para otro proyecto"],
        ["Precio", "Productos normales conservan unit_price recibido del navegador; carnet normaliza formatos.", "Derivar precio desde DB o catálogo firmado en servidor."],
        ["Origen", "back_url del cliente se reutiliza en retorno y notification_url.", "Usar dominio de allowlist y construir URLs server-side."],
        ["Stock", "Verificación previa; updates separados; puede haber sobreventa concurrente.", "Transacción con lock/UPDATE atómico y resultado idempotente."],
        ["Webhook", "Responde 200 incluso en errores y no verifica firma explícita.", "Validar firma, devolver error en fallas y mantener idempotencia."],
    ], row_h=29, body_size=6.7)


def page_admin(doc):
    page = new_page(doc, "4. Administración, sesión y seguridad",
                    "Autenticación propia para operaciones internas; no hay cuentas de clientes ni SSO.")
    section_label(page, "Sesión administrativa", 34, 95, 350)
    box(page, 44, 126, 112, 55, "ADMIN LOGIN", "POST /api/admin/login + password", body_size=6.8)
    box(page, 190, 126, 125, 55, "COOKIE", "admin_token HttpOnly, SameSite=Lax, TTL 8 h", body_size=6.8)
    box(page, 349, 126, 125, 55, "adminGuard", "timestamp:HMAC; valida firma y edad", body_size=6.8)
    arrow(page, 156, 153, 190, 153)
    arrow(page, 315, 153, 349, 153)
    section_label(page, "Áreas protegidas", 408, 95, 350)
    add_text(page,
             "La cookie protege stock, settings, productos, imágenes y uploads. Catálogo, stock público, pagos y serving "
             "de imágenes son públicos por diseño. ADMIN_PASSWORD y SESSION_SECRET deben existir como secretos server-side. "
             "No hay auth de usuarios, roles, Supabase Auth ni sesión persistida en DB.",
             408, 125, 350, size=8.1, line_h=10.4, max_height=75)
    section_label(page, "Configuración sensible (nombres, nunca valores)", 34, 220, 724)
    table(page, 34, 244, [180, 240, 304], [
        ["Nombre", "Uso", "Qué debe ocurrir"],
        ["DATABASE_URL", "Conexión PostgreSQL/Drizzle", "Obligatoria; gestionar con secret manager."],
        ["ADMIN_PASSWORD", "Contraseña de admin", "Nunca dejar fallback en producción; rotar."],
        ["SESSION_SECRET", "Firma HMAC de cookie", "Secreto largo; no usar dev-secret."],
        ["MP_ACCESS_TOKEN", "Mercado Pago server-side", "No exponer al bundle; rotar y limitar."],
        ["BLOB_READ_WRITE_TOKEN", "Vercel Blob", "Solo API; seleccionar storage de forma explícita."],
        ["PRIVATE_OBJECT_DIR / PUBLIC_OBJECT_SEARCH_PATHS", "Storage Replit/GCS", "Separar objetos privados y públicos."],
        ["PORT / BASE_PATH / NODE_ENV / LOG_LEVEL / REPL_ID / CI", "Runtime y build", "No son credenciales; cambian ejecución."],
        ["SUPABASE_DATABASE_URL / MP_PUBLIC_KEY", "Disponibles en entorno", "No se detectó uso activo en el código actual."],
    ], row_h=25, body_size=6.55)
    section_label(page, "Riesgos a corregir al enseñar este patrón", 34, 501, 724)
    add_text(page,
             "El código contiene fallbacks de desarrollo para password y secreto si faltan variables; la comparación no usa "
             "timingSafeEqual y no hay rate limiting. CORS refleja cualquier origin con credentials:true. En un proyecto nuevo, "
             "fallar al arrancar si falta un secreto es más seguro que continuar silenciosamente.",
             34, 525, 724, size=7.9, line_h=9.7, max_height=39)


def page_storage(doc):
    page = new_page(doc, "5. Imágenes y almacenamiento de objetos",
                    "Dos backends posibles; la selección se hace por configuración y cambia el recorrido.")
    section_label(page, "Decisión de backend", 34, 95, 724)
    box(page, 45, 128, 132, 58, "ADMIN BROWSER", "Pide URL y sube imagen directa", body_size=6.8)
    box(page, 212, 128, 150, 58, "API STORAGE", "Cookie admin + presign/PUT", body_size=6.8)
    box(page, 410, 107, 145, 58, "VERCEL BLOB", "Si existe BLOB_READ_WRITE_TOKEN", body_size=6.8)
    box(page, 410, 178, 145, 58, "REPLIT / GCS", "Fallback con sidecar 127.0.0.1:1106", body_size=6.8)
    box(page, 603, 128, 145, 58, "POSTGRESQL", "product_images conserva URL y metadatos", body_size=6.8)
    arrow(page, 177, 157, 212, 157, "request")
    arrow(page, 362, 145, 410, 136, "branch")
    arrow(page, 362, 171, 410, 207, "branch")
    arrow(page, 555, 136, 603, 157, "URL")
    arrow(page, 555, 207, 603, 157, "URL")
    section_label(page, "Detalles de funcionamiento", 34, 266, 350)
    add_text(page,
             "* Vercel Blob: /api/storage/uploads/direct recibe hasta 10 MB, escribe objeto público y sirve por redirect/list.\n"
             "* Replit/GCS: PUBLIC_OBJECT_SEARCH_PATHS localiza públicos; PRIVATE_OBJECT_DIR permite URLs firmadas de PUT por 15 minutos.\n"
             "* La DB guarda URL/metadatos, no los bytes.\n"
             "* Los endpoints de serving son públicos; el upload requiere cookie admin.\n"
             "* Al borrar fila no hay limpieza automática garantizada del objeto: pueden quedar blobs huérfanos.",
             34, 290, 350, size=7.9, line_h=10.2, max_height=132)
    section_label(page, "Privacidad y diseño", 408, 266, 350)
    add_text(page,
             "Las imágenes de productos son públicas intencionalmente. Las fotos de clientes pueden contener teléfonos, "
             "nombres o datos de contacto: deben sanitizarse antes de galería, testimonio o asset público. "
             "Replit Object Storage depende del sidecar de Replit; una URL firmada no es un reemplazo universal para una "
             "política de acceso. En Vercel, usar Blob exige que la variable exista y que el flujo quede probado en ese entorno.",
             408, 290, 350, size=7.9, line_h=10.2, max_height=132)
    section_label(page, "Regla reusable", 34, 432, 724)
    add_text(page,
             "Separar bytes de metadatos permite cambiar proveedor sin migrar órdenes ni productos: el API controla autorización "
             "y metadatos; el storage maneja bytes; PostgreSQL conserva la referencia consultable. Para migrar, primero define "
             "quién puede leer, quién puede escribir, cuánto dura una URL firmada y cómo se borran objetos huérfanos.",
             34, 456, 724, size=8.1, line_h=10.2, max_height=64)


def page_media_links(doc):
    page = new_page(doc, "6. Vídeo, enlaces y servicios sin API",
                    "Diferenciar una integración operativa de un enlace externo o un recurso cargado por el navegador.")
    section_label(page, "Artifact de vídeo", 34, 95, 350)
    add_text(page,
             "candys-pet-video es un artifact web independiente. Vite usa BASE_PATH=/candys-pet-video/ para que sus "
             "assets relativos no escapen del subpath. El storefront lo monta en un iframe con allow=autoplay. "
             "El video cozy-puppy.mp4 aparece en escenas; bg_music.mp3 acompaña la plantilla de cinco escenas de aproximadamente "
             "ocho segundos. VideoSection y VideoTemplate intercambian candys:audio-focus por postMessage para atenuar audio "
             "según el foco. Es un flujo estático, no API ni Supabase.",
             34, 119, 350, size=7.9, line_h=10.1, max_height=145)
    section_label(page, "Otros recursos visuales", 408, 95, 350)
    add_text(page,
             "El carnet veterinario tiene además un MP4 importado desde attached_assets y reproducido inline. "
             "Ese archivo y los exports descargables no son la fuente del iframe principal. "
             "Google Fonts se carga desde fonts.googleapis.com y fonts.gstatic.com en storefront, video y mockup: "
             "no hay self-hosting y el navegador contacta a Google.",
             408, 119, 350, size=7.9, line_h=10.1, max_height=145)
    section_label(page, "Clasificación de integraciones externas", 34, 292, 724)
    table(page, 34, 316, [150, 220, 190, 164], [
        ["Servicio / marca", "Qué hace aquí", "Tipo de integración", "Qué no hace"],
        ["WhatsApp / wa.me", "Fallback de pago, retiro, consultas y pedidos", "Link externo con texto codificado", "No hay API, webhook ni historial local"],
        ["Instagram / TikTok", "Links de marca, colaboración y tráfico", "Link estático", "No hay SDK, login, pixel ni sincronización"],
        ["Google Fonts", "Tipografías de navegador", "Carga HTTP desde CDN externo", "No es auth ni almacenamiento"],
        ["Blue Express / Starken / Chilexpress", "Nombre/logo y tarifa fija seleccionada", "Dato de pedido + presentación", "No hay API, tracking ni etiquetas"],
        ["Cloudflare", "Integración instalada del workspace", "Infra de cuenta, no flujo observado", "No se cambió DNS para esta app"],
        ["Supabase", "No implementado", "Solo nombre de secret disponible", "No hay cliente, tablas ni Auth"],
        ["Stripe", "Antecedente histórico", "Commits antiguos", "No hay dependencia ni checkout vigente"],
    ], row_h=28, body_size=6.6)
    section_label(page, "Cómo leer esta distinción", 34, 541, 724)
    add_text(page,
             "Si no existe SDK, endpoint, webhook, token usado o sincronización, no conviene llamarlo integración operativa. "
             "Documentarlo como enlace, recurso CDN, dato visual o legado evita prometer capacidades que el sistema no tiene.",
             34, 565, 724, size=7.5, line_h=9.2, max_height=24)


def page_matrix(doc):
    page = new_page(doc, "7. Matriz completa de integraciones",
                    "Inventario consolidado: propósito, dirección de datos, autenticación y estado.")
    rows = [
        ["Integración", "Dirección de datos", "Autenticación / config", "Estado actual"],
        ["Replit", "Código y navegador -> workflows; API -> sidecar storage", "Secrets, workflows, Node 24, DB provisionada", "Activo para desarrollo/preview"],
        ["GitHub", "Replit commit -> main -> Vercel", "Git remoto/conector; no mostrar tokens", "Origen de despliegue; permisos deben verificarse"],
        ["Vercel", "Git -> build -> CDN/Function -> navegador", "Proyecto + vercel.json; Blob token opcional", "Producción: API, tienda y video"],
        ["PostgreSQL + Drizzle", "API <-> rows de catálogo, stock, órdenes", "DATABASE_URL", "Fuente de verdad de negocio"],
        ["Mercado Pago", "API -> preference; MP -> webhook -> API/DB", "MP_ACCESS_TOKEN", "Checkout condicional activo"],
        ["Vercel Blob", "API/admin -> bytes públicos; DB -> URL", "BLOB_READ_WRITE_TOKEN", "Branch si token existe"],
        ["Replit Object Storage/GCS", "API/admin <-> sidecar <-> objetos", "PRIVATE_OBJECT_DIR; PUBLIC_OBJECT_SEARCH_PATHS", "Fallback en runtime Replit"],
        ["Admin auth propia", "Browser -> login -> cookie -> API admin", "ADMIN_PASSWORD; SESSION_SECRET", "Activo; requiere hardening"],
        ["WhatsApp", "Browser -> wa.me con carrito", "Cuenta del usuario; sin API", "Fallback comercial"],
        ["Instagram/TikTok", "Browser -> link externo", "Ninguna", "Enlaces de marca"],
        ["Google Fonts", "Browser -> fonts.googleapis.com/gstatic", "Ninguna", "CDN tipográfico"],
        ["Transportistas", "Browser -> API como selección de envío", "Ninguna", "Presentación; sin API logística"],
        ["Cloudflare", "No hay flujo de negocio observado", "Cuenta instalada", "No usar como evidencia de DNS cambiado"],
        ["Supabase", "No hay flujo de código", "SUPABASE_DATABASE_URL disponible, no usado", "No activo"],
        ["Stripe", "No hay flujo actual", "Historial solamente", "Legado no operativo"],
    ]
    table(page, 34, 97, [142, 210, 210, 162], rows, row_h=25, body_size=6.45)
    section_label(page, "Variables y secretos: inventario seguro", 34, 521, 724)
    add_text(page,
             "Nombres detectados/disponibles: DATABASE_URL, MP_ACCESS_TOKEN, MP_PUBLIC_KEY, SESSION_SECRET, ADMIN_PASSWORD, "
             "BLOB_READ_WRITE_TOKEN, PRIVATE_OBJECT_DIR, PUBLIC_OBJECT_SEARCH_PATHS, DEFAULT_OBJECT_STORAGE_BUCKET_ID, "
             "SUPABASE_DATABASE_URL, PORT, BASE_PATH, NODE_ENV, LOG_LEVEL, REPL_ID y CI. Este PDF deliberadamente no contiene "
             "valores. La regla general es inyectar credenciales en runtime, validarlas al iniciar y nunca compilar secretos en el frontend.",
             34, 545, 724, size=7.2, line_h=8.7, max_height=31)


def page_learning(doc):
    page = new_page(doc, "8. Guía para repetir la arquitectura",
                    "Un método práctico para construir otro proyecto sin perder trazabilidad.")
    section_label(page, "Paso a paso reusable", 34, 95, 350)
    y = 120
    steps = [
        ("1. Define límites", "Separa storefront, API, DB, media y deploy. Decide qué es público y qué requiere sesión."),
        ("2. Define contratos", "Escribe OpenAPI/Zod: entradas, salidas, errores, estados y quién deriva cada campo."),
        ("3. Separa secretos", "Usa secret manager; el navegador recibe solo valores públicos. Falla al iniciar si falta lo crítico."),
        ("4. Diseña la persistencia", "Guarda metadatos en DB y bytes en object storage; registra ownership, TTL y limpieza."),
        ("5. Haz el checkout server-side", "El navegador propone; el API valida precio, stock, total, origen y genera la orden."),
        ("6. Haz webhooks idempotentes", "Consulta al proveedor, valida firma, guarda evento, actualiza estado y responde con el código correcto."),
        ("7. Define deploy reproducible", "Un comando frozen-lockfile, output único, rutas API explícitas y smoke tests de salud."),
        ("8. Audita integraciones", "Para cada servicio escribe propósito, dirección, auth, estado y lo que no hace."),
    ]
    for title, body in steps:
        y = bullet_block(page, 34, y, 350, title, body, size=7.65) + 4
    section_label(page, "Checklist de verificación", 408, 95, 350)
    add_text(page,
             "Antes de publicar:\n"
             "[ ] GET /api/healthz responde 200.\n"
             "[ ] Catálogo, stock, imágenes y rutas SPA cargan en el dominio real.\n"
             "[ ] Checkout sin token falla de forma explícita y ofrece fallback.\n"
             "[ ] Webhook prueba approved, rejected, pending y duplicado.\n"
             "[ ] Precio y stock se calculan en servidor.\n"
             "[ ] Cookie admin expira, no usa defaults y tiene CSRF/origin control.\n"
             "[ ] Storage valida tamaño, ownership y limpieza.\n"
             "[ ] Video y assets respetan BASE_PATH y no devuelven index.html por error.\n"
             "[ ] No se imprimen secrets en logs ni PDF.\n"
             "[ ] Se verifica el deployment READY y un smoke test público.",
             408, 120, 350, size=8, line_h=10.8, max_height=190)
    section_label(page, "Prioridades técnicas detectadas", 34, 475, 724)
    add_text(page,
             "1) Eliminar fallbacks de credenciales de desarrollo. 2) Restringir CORS y derivar URLs desde una allowlist. "
             "3) Validar precios contra catálogo/DB. 4) Hacer stock atómico. 5) Validar firma y reintentos de webhook. "
             "6) Hacer que PaymentResult consulte la orden real. 7) Completar los datos de mascota del carnet. "
             "8) Proteger datos de clientes y limpiar blobs huérfanos. 9) Mantener separado el artifact de video y probar sus rutas.",
             34, 499, 724, size=8, line_h=10.2, max_height=67)


def page_sources(doc):
    page = new_page(doc, "9. Fuentes auditadas y glosario",
                    "Puntos de entrada para leer el código y verificar cada afirmación.")
    section_label(page, "Fuentes principales", 34, 95, 350)
    add_text(page,
             "Configuración: vercel.json, .replit, replit.md, artifact.toml de cada artifact.\n"
             "API: artifacts/api-server/src/app.ts, src/index.ts, routes/catalog.ts, stock.ts, payment.ts, admin.ts, storage.ts.\n"
             "Persistencia: lib/db/src/index.ts, drizzle.config.ts y lib/db/src/schema/*.\n"
             "Frontend: artifacts/candys-pet/src/hooks, context/CartContext.tsx, components/CartDrawer.tsx, pages/AdminPage.tsx, "
             "components/VideoSection.tsx y pages/PaymentResult.tsx.\n"
             "Video: artifacts/candys-pet-video/src/components/video/VideoTemplate.tsx y video_scenes/*.\n"
             "Memoria operativa: .agents/memory/vercel-github-auto-deploy.md, vercel-monorepo-api-entry.md, "
             "customer-image-privacy.md, imported-artifact-registration.md y github-push-auth.md.",
             34, 119, 350, size=7.75, line_h=10.1, max_height=205)
    section_label(page, "Glosario", 408, 95, 350)
    add_text(page,
             "Artifact: unidad ejecutable/preview registrada en el workspace.\n"
             "SPA: aplicación de una sola página; Vercel sirve index.html para rutas del frontend.\n"
             "Function: backend serverless invocado por /api.\n"
             "Webhook: llamada de un proveedor al backend para notificar un evento.\n"
             "Presigned URL: URL temporal para subir/leer un objeto sin exponer credenciales.\n"
             "Idempotencia: repetir un evento no repite sus efectos.\n"
             "Fallback: comportamiento alternativo cuando un servicio no está configurado o falla.\n"
             "Origin: dominio que inicia una petición; debe controlarse en CORS y URLs de retorno.\n"
             "Snapshot: copia JSON del carrito guardada para conservar qué se compró.",
             408, 119, 350, size=7.9, line_h=10.4, max_height=205)
    section_label(page, "Nota final", 34, 365, 724)
    add_text(page,
             "Este documento describe el estado observado del proyecto y distingue explícitamente lo activo, lo opcional, "
             "lo histórico y lo que solo es un enlace. Para aprender, siga las flechas de cada diagrama y luego abra las "
             "fuentes indicadas: primero el contrato API, después la ruta del navegador y finalmente la integración externa. "
             "La arquitectura más importante no es el proveedor; es la dirección de los datos, la autoridad de cada campo y "
             "la forma de confirmar que una operación terminó realmente.",
             34, 389, 724, size=8.5, line_h=10.8, max_height=84)
    page.draw_rect(fitz.Rect(34, 500, 758, 550), color=BLACK, width=0.8)
    add_text(page,
             "Privacidad: este PDF se genera como archivo descargable privado. No se publica en la página de Candy's Pet. "
             "No contiene contraseñas, tokens, connection strings ni valores de secretos.",
             45, 514, 700, size=8.5, line_h=10.8, bold=True, max_height=30)


def main():
    doc = fitz.open()
    page_cover(doc)
    page_deployment(doc)
    page_runtime(doc)
    page_payment(doc)
    page_admin(doc)
    page_storage(doc)
    page_media_links(doc)
    page_matrix(doc)
    page_learning(doc)
    page_sources(doc)
    doc.set_metadata({
        "title": "Candy's Pet - Organigrama técnico de integraciones",
        "author": "Replit Agent",
        "subject": "Arquitectura, integraciones y flujos de datos",
        "keywords": "Candy's Pet, organigrama, integraciones, Vercel, GitHub, Mercado Pago, PostgreSQL",
    })
    OUT.parent.mkdir(parents=True, exist_ok=True)
    doc.save(OUT, garbage=4, deflate=True)
    print(f"created {OUT} pages={len(doc)} bytes={OUT.stat().st_size}")


if __name__ == "__main__":
    main()