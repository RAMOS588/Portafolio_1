// Inicializar tooltips y popovers
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar elementos de Bootstrap que necesitan inicialización JS
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Animación de barras de progreso al hacer scroll
    animateProgressBars();
    
    // Validación de formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Efecto de escritura para el texto del héroe
    const heroText = document.querySelector('.hero-text');
    if (heroText && !sessionStorage.getItem('animationShown')) {
        typeWriter(heroText);
        sessionStorage.setItem('animationShown', 'true');
    }
    
    // Navegación suave
    enableSmoothScrolling();
});

// Animación de barras de progreso
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('aria-valuenow') + '%';
                entry.target.style.width = width;
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Manejo del envío del formulario
function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Simular envío
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';
    
    // Aquí iría la lógica real de envío del formulario
    setTimeout(() => {
        alert('¡Mensaje enviado con éxito! Te contactaré pronto.');
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }, 1500);
}

// Efecto de máquina de escribir
function typeWriter(element) {
    const text = element.textContent;
    element.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, 50);
        }
    }
    
    type();
}

// Navegación suave
function enableSmoothScrolling() {
    document.querySelectorAll('a.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Solo para enlaces internos que comienzan con #
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Efecto parallax para el héroe
function initParallax() {
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.backgroundPosition = `center ${rate}px`;
        });
    }
}
document.addEventListener('DOMContentLoaded', function() {
  // Datos de los proyectos
  const projects = {
    1: {
      title: "Sistema de Recomendación",
      image: "img/proyecto1.jpg",
      description: "Sistema de recomendación de películas utilizando algoritmos de machine learning y filtrado colaborativo.",
      fullDescription: `<p>Desarrollé un sistema de recomendación de películas que analiza los patrones de visualización de los usuarios y sugiere contenido relevante basado en sus preferencias.</p>
                        <p><strong>Características principales:</strong></p>
                        <ul>
                          <li>Algoritmo de filtrado colaborativo</li>
                          <li>Integración con base de datos de películas</li>
                          <li>Interfaz web responsive</li>
                          <li>Sistema de calificación de películas</li>
                        </ul>
                        <p><strong>Tecnologías utilizadas:</strong> Python, Pandas, Scikit-learn, Flask, JavaScript</p>`,
      link: "#"
    },
    2: {
      title: "App de Tareas",
      image: "img/proyecto2.jpg",
      description: "Aplicación web para gestión de tareas con recordatorios y categorización.",
      fullDescription: `<p>Aplicación web completa para la gestión de tareas diarias con sistema de recordatorios y categorización inteligente.</p>
                        <p><strong>Características principales:</strong></p>
                        <ul>
                          <li>Creación, edición y eliminación de tareas</li>
                          <li>Recordatorios por correo electrónico</li>
                          <li>Categorización y etiquetado de tareas</li>
                          <li>Sincronización entre dispositivos</li>
                        </ul>
                        <p><strong>Tecnologías utilizadas:</strong> React, Node.js, Express, MongoDB</p>`,
      link: "#"
    },
    3: {
      title: "Robot Autónomo",
      image: "img/proyecto3.jpg",
      description: "Robot con navegación autónoma usando sensores y visión artificial.",
      fullDescription: `<p>Diseñé y construí un robot autónomo capaz de navegar en entornos interiores evitando obstáculos y siguiendo trayectorias definidas.</p>
                        <p><strong>Características principales:</strong></p>
                        <ul>
                          <li>Navegación autónoma con SLAM</li>
                          <li>Detección de obstáculos con sensores ultrasónicos</li>
                          <li>Visión artificial para reconocimiento de objetos</li>
                          <li>Control mediante ROS (Robot Operating System)</li>
                        </ul>
                        <p><strong>Tecnologías utilizadas:</strong> Arduino, Raspberry Pi, ROS, OpenCV, Python</p>`,
      link: "#"
    }
  };

  // Configurar event listeners para las tarjetas de proyecto
  const projectCards = document.querySelectorAll('.project-card');
  const projectModal = new bootstrap.Modal(document.getElementById('projectModal'));
  
  projectCards.forEach(card => {
    card.addEventListener('click', function() {
      const projectId = this.getAttribute('data-project');
      const project = projects[projectId];
      
      if (project) {
        document.getElementById('modalProjectTitle').textContent = project.title;
        document.querySelector('.modal-project-img').src = project.image;
        document.getElementById('modalProjectContent').innerHTML = project.fullDescription;
        document.getElementById('modalProjectLink').href = project.link;
        
        projectModal.show();
      }
    });
  });
});