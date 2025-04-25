export function initNavigation() {
    const menuItems = document.querySelectorAll('.menu-lateral a');
    
    menuItems.forEach(item => {
      item.addEventListener('click', (e) => {
        // Remover clase activa de todos los items
        menuItems.forEach(i => i.classList.remove('active'));
        
        // Agregar clase activa al item clickeado
        e.currentTarget.classList.add('active');
        
        // Logica para cargar contenidos
      });
    });
  }