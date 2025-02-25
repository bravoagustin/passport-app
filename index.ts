import { chromium } from "playwright";

(async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    console.log("Abriendo LinkedIn...");
    await page.goto("https://www.linkedin.com/feed/");

    // Esperar que el usuario inicie sesión manualmente si es necesario
    await page.waitForTimeout(15000); // Ajusta el tiempo según sea necesario

    console.log("Extrayendo publicaciones...");
    const posts = await page.locator('[data-testid="feed-shared-update-v2"]').all();

    let matchingPosts: string[] = []; // ✅ Definimos el tipo explícito como string[]

    for (const post of await posts) {
        try {
            const text = await post.textContent();
            if (text) {
                const cleanText = text.trim().toLowerCase();
                if (cleanText.includes("nodejs") || cleanText.includes("full stack")) {
                    matchingPosts.push(cleanText); // ✅ Ahora TypeScript reconoce el tipo correctamente
                }
            }
        } catch (error) {
            console.error("Error obteniendo texto de una publicación:", error);
        }
    }

    if (matchingPosts.length > 0) {
        console.log("🚀 Se encontraron publicaciones con ofertas:");
        matchingPosts.forEach((post, index) => {
            console.log(`\n📝 Publicación ${index + 1}:\n${post}`);
        });
    } else {
        console.log("❌ No se encontraron ofertas con Node.js o Full Stack en el feed.");
    }

    await browser.close();
})();
