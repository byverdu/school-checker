const createSchoolPopup = ({ OverlayView = google.maps.OverlayView,  ...args }) => {
    class Popup extends OverlayView {
      public position: google.maps.LatLng;
      public textContent: string;
      public container: HTMLDivElement;
    
      constructor() {
        super();
    
        this.position = args.position;
        this.textContent = args.textContent;
        this.container = null;
    
        this.setMap(args.map);
      }
    
      onAdd() {
        const parentDiv = document.createElement('div');
        const childDiv = document.createElement('div');
        childDiv.textContent = this.textContent;
        childDiv.classList.add('school-title-popup');
        parentDiv.classList.add('school-parent-popup');

        parentDiv.appendChild(childDiv);
        this.container = parentDiv;
    
        
        const panes = this.getPanes();
        panes.overlayLayer.appendChild(parentDiv);

        var me = this;

        this.getPanes().overlayMouseTarget.appendChild(this.container);
        google.maps.event.addDomListener(
          this.container,
          'mouseover',
          () => {
            google.maps.event.trigger(this, 'mouseover');
            this.onHover();
          }
        );

        google.maps.event.addDomListener(
          this.container,
          'mouseleave',
          () => {
            google.maps.event.trigger(this, 'mouseleave');
            this.onBlur();
          }
        );

        
      }
    
      draw() {
        var divPosition = this.getProjection().fromLatLngToDivPixel(this.position);
    
        var display =
          Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000 ?
            'flex' :
            'none';
    
        if (display === 'flex') {
          this.container.style.left = (divPosition.x - 50) + 'px';
          this.container.style.top = (divPosition.y - 40) + 'px';
        }
        if (this.container.style.display !== display) {
          this.container.style.display = display;
        }
      }

      onHover () {
        (this.container.querySelector('.school-title-popup') as HTMLElement).style.display = 'block'
      }

      onBlur () {
        (this.container.querySelector('.school-title-popup') as HTMLElement).style.display = 'none'
      }
    }
    return new Popup();
  }


export default createSchoolPopup;