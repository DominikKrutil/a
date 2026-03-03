document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector("nav");
    const openBtn = document.querySelector(".open-btn");
    const closeBtn = document.querySelector(".close-btn");
    const navLinks = document.querySelectorAll(".nav-link");

    // Selektory přesně podle tvé struktury
    const dropdownBtn = document.querySelector('.apartments-dropdown-btn');
    const dropdownLinks = document.querySelectorAll('.apartments-dropdown-link');
    const mainApartmentsLink = document.querySelector('.apartments-main-link');

    // --- 1. OTEVÍRÁNÍ A ZAVÍRÁNÍ HAMBURGERU ---
    const toggleMenu = (state) => {
        if (nav) {
            nav.classList.toggle("active", state);
            document.body.style.overflow = state ? "hidden" : "";
        }
    };

    if (openBtn) openBtn.addEventListener("click", () => toggleMenu(true));
    if (closeBtn) closeBtn.addEventListener("click", () => toggleMenu(false));

    // --- 2. LOGIKA PRO ŠIPKU (Dropdown) ---
    if (dropdownBtn) {
        dropdownBtn.addEventListener('click', (e) => {
            console.log("Kliknuto na šipku"); // Pro kontrolu v F12
            e.preventDefault();
            e.stopPropagation();

            const parent = dropdownBtn.closest('.nav-item');
            if (parent) {
                parent.classList.toggle('active');
            }
        });
    }

    // --- 3. AKTIVNÍ LINKY (Hlavní menu) ---
    navLinks.forEach(link => {
        link.addEventListener("click", function() {
            // Nastavení aktivní třídy
            navLinks.forEach(l => l.classList.remove("active-link"));
            this.classList.add("active-link");
            
            // Pokud to není odkaz na apartmány, menu se po kliku zavře
            if (!this.classList.contains('apartments-main-link')) {
                setTimeout(() => toggleMenu(false), 300);
            }
        });
    });

    // --- 4. KLIKNUTÍ NA KONKRÉTNÍ APARTMÁN (Adriana / Aneta) ---
    dropdownLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            console.log("Vybrán apartmán z menu");
            
            // Aktivujeme hlavní slovo "Apartmány"
            navLinks.forEach(l => l.classList.remove("active-link"));
            if (mainApartmentsLink) {
                mainApartmentsLink.classList.add("active-link");
            }

            // Zavřeme dropdown i celé mobilní menu
            const parent = link.closest('.nav-item');
            if (parent) parent.classList.remove('active');
            
            setTimeout(() => toggleMenu(false), 300);
        });
    });

    // --- 5. ZAVŘENÍ PŘI KLIKNUTÍ MIMO ---
    document.addEventListener("click", (e) => {
        // Zavření dropdownu
        const activeDropdown = document.querySelector('.nav-item.active');
        if (activeDropdown && !activeDropdown.contains(e.target)) {
            activeDropdown.classList.remove('active');
        }
        
        // Zavření hamburgeru
        if (nav?.classList.contains("active") && !nav.contains(e.target) && !openBtn?.contains(e.target)) {
            toggleMenu(false);
        }
    });
});