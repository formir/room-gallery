import RoomGallery, { IroomGallery } from './../src/RoomGallery';

describe('RoomGallery', () => {
  let roomGallery: RoomGallery;

  beforeEach(() => {
    const container = document.createElement('div');
    container.id = 'test-container';
    document.body.appendChild(container);

    const options: IroomGallery = {
      element: '#test-container',
      items: [
        {
          image: 'image1.jpg',
          title: 'Image 1',
          description: 'Description 1',
        },
        {
          image: 'image2.jpg',
          title: 'Image 2',
          description: 'Description 2',
        },
        {
          image: 'image3.jpg',
          title: 'Image 3',
          description: 'Description 3',
        },
      ],
    };

    roomGallery = new RoomGallery(options);
  });

  afterEach(() => {
    const container = document.querySelector('#test-container');
    if (container) {
      container.remove();
    }
  });

  it('should initialize RoomGallery', () => {
    expect(roomGallery).toBeDefined();
  });

  it('should find the container element', () => {
    expect(roomGallery.container).toBeDefined();
    expect(roomGallery.container instanceof Element).toBe(true);
  });

  it('should prepare props correctly', () => {
    const { props } = roomGallery;
    expect(props.items).toHaveLength(3);
    expect(props.items && props.items[0]).toEqual({
      image: 'image1.jpg',
      title: 'Image 1',
      description: 'Description 1',
    });
  });

  it('should go to the next item', () => {
    roomGallery.gotoNextItem();
  });

  it('should go to the previous item', () => {
    roomGallery.gotoPrevItem();
  });

  it('should toggle dark mode', () => {
    roomGallery.toggleDarkMode();
  });

  it('should set dark mode', () => {
    roomGallery.setDarkMode(true);
  });

  it('should toggle zoom', () => {
    roomGallery.toggleZoom();
  });

  it('should set zoom', () => {
    roomGallery.setZoom(true);
  });

  it('should get the current item', () => {
    const currentItem = roomGallery.getCurrentItem();
  });

});
