export default {
  items: [
    {
      name: 'MENU',
      url: '/dashboard',
      icon: 'icon-menu  ',
      badge: {
        variant: 'info',
        text: 'Welcome',
      },
    },
    {
      title: true,
      name: 'Products',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'รายชื่อสินค้า',
      url: '/products/list',
      icon: 'icon-list',
    },
    {
      name: 'เพิ่มสินค้า',
      url: '/products/add',
      icon: 'icon-plus',
    },
    {
      title: true,
      name: 'Order',
      wrapper: {
        element: '',
        attributes: {},
      },
    
    },
    // {
    //   name: 'Buttons',
    //   url: '/buttons',
    //   icon: 'icon-cursor',
    //   children: [
    //     {
    //       name: 'Buttons',
    //       url: '/buttons/buttons',
    //       icon: 'icon-cursor',
    //     },
    //     {
    //       name: 'Button dropdowns',
    //       url: '/buttons/button-dropdowns',
    //       icon: 'icon-cursor',
    //     },
    //     {
    //       name: 'Button groups',
    //       url: '/buttons/button-groups',
    //       icon: 'icon-cursor',
    //     },
    //     {
    //       name: 'Brand Buttons',
    //       url: '/buttons/brand-buttons',
    //       icon: 'icon-cursor',
    //     },
    //   ],
    // },
    {
      name: 'รายการสั่งซื้อ',
      url: '/order/list',
      icon: 'cui-tablet',
    },
    {
      name: 'รายการจัดส่ง',
      url: '/order/track',
      icon: 'cui-cloud',
      
    }
  ]
  }
