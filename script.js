fetch("data.json")
    .then(response => response.json())
    .then(data => {
        const carouselInner = document.querySelector(".carousel-inner");
        let currentIndex = 0;

        // Generar dinámicamente los elementos del carrusel
        data.forEach((item, index) => {
            const carouselItem = document.createElement("div");
            carouselItem.className = `carousel-item ${index === 0 ? "active" : ""}`;

            if (item.type === "image") {
                carouselItem.innerHTML = `
                    <img src="${item.src}" alt="${item.title}">
                    <div class="carousel-caption-title">${item.title}</div>
                    <div class="carousel-caption-description">${item.description}</div>
                `;
            } else if (item.type === "video") {
                carouselItem.innerHTML = `
                    <video controls>
                        <source src="${item.src}" type="video/mp4">
                        Tu navegador no soporta el formato de video.
                    </video>
                    <div class="carousel-caption-title">${item.title}</div>
                    <div class="carousel-caption-description">${item.description}</div>
                `;
            }

            carouselInner.appendChild(carouselItem);
        });

        // Controles del carrusel
        const prevButton = document.getElementById("prev");
        const nextButton = document.getElementById("next");

        prevButton.addEventListener("click", () => {
            currentIndex = (currentIndex === 0) ? data.length - 1 : currentIndex - 1;
            updateCarousel();
        });

        nextButton.addEventListener("click", () => {
            currentIndex = (currentIndex === data.length - 1) ? 0 : currentIndex + 1;
            updateCarousel();
        });

        function updateCarousel() {
            const offset = -currentIndex * 100; // Mover por cada slide
            carouselInner.style.transform = `translateX(${offset}%)`;
        }
    })
    .catch(error => console.error("Error al cargar el JSON:", error));
