/*
 *httpps://github.com/konishilee/konishileecanvas
 *Author: KonishiLee
 *Date: 20160618
 */
(function(){
  var ctx;
  var baseColor = '#ccc';
  var colors = [
    'red',
    'black',
    'yellow'
  ];

  var opts = {
    baseColor: baseColor, //底色
    colors: colors, //颜色数组
    data: [], //数据
    lineWidth: 20, //图标宽度
    height: 100, //高度
    font: '20px', //字体大小
    fontColor: baseColor
  }

  var KCanvas = window.KCanvas = function(element, options){
    ctx = element.getContext('2d');

    this.data = options.data || opts.data;
    this.lineWidth = options.lineWidth || opts.lineWidth;
    this.height = options.height || opts.height;
    this.baseColor = options.baseColor || opts.baseColor;
    this.colors = options.colors || opts.colors;
    this.font = options.font || opts.font;
    this.fontColor = options.fontColor || opts.fontColor;
  }

  KCanvas.prototype = {
    long: function(){
      var total = 0;

      for (var i = 0; i < this.data.length; i++) {
        ctx.fillStyle = colors[i];
        ctx.fillRect(i * this.lineWidth * 2 + this.lineWidth, this.lineWidth * 2, this.lineWidth, this.height);
        total += this.data[i].data;

        ctx.font = this.font + ' abc';
        ctx.fillStyle = this.fontColor;
        ctx.fillText(this.data[i].data, i * this.lineWidth * 2 + this.lineWidth * 1.4, this.lineWidth * 1.5);

        ctx.font = this.font + ' abc';
        ctx.fillStyle = this.fontColor;
        ctx.fillText(this.data[i].label, i * this.lineWidth * 2 + this.lineWidth * 1.4, this.height + this.lineWidth * 2 + this.lineWidth / 2 + 10);
      }

      for (var i = 0; i < this.data.length; i++) {
        ctx.fillStyle = baseColor;
        ctx.fillRect(i * this.lineWidth * 2 + this.lineWidth, this.lineWidth * 2, this.lineWidth, this.height - this.data[i].data/total * this.height);
      }
    },

    cross: function(){
      var total = 0;

      for (var i = 0; i < this.data.length; i++) {
        ctx.fillStyle = baseColor;
        ctx.fillRect(this.lineWidth * 2, i * this.lineWidth * 2 + this.lineWidth, this.height, this.lineWidth);
        total += this.data[i].data;

        ctx.font = this.font + ' abc';
        ctx.fillStyle = this.fontColor;
        ctx.fillText(this.data[i].data, this.lineWidth * 2.5 + this.height, i * this.lineWidth * 2 + this.lineWidth * 1.6);

        ctx.font = this.font + ' abc';
        ctx.fillStyle = this.fontColor;
        ctx.fillText(this.data[i].label, this.lineWidth, i * this.lineWidth * 2 + this.lineWidth * 1.6);
      }

      for (var i = 0; i < this.data.length; i++) {
        ctx.fillStyle = colors[i];
        ctx.fillRect(this.lineWidth * 2, i * this.lineWidth * 2 + this.lineWidth, this.data[i].data/total * this.height, this.lineWidth);
      }
    },

    round: function(){
      for (var i = 0; i < this.data.length; i++) {
        ctx.beginPath();
        ctx.arc(this.lineWidth * 2 + this.lineWidth * i * 3, this.lineWidth * 2, this.lineWidth, 0, 2 * Math.PI, false);
        ctx.lineWidth = this.lineWidth / 10;
        ctx.strokeStyle = this.baseColor;
        ctx.stroke();
        ctx.closePath();

        ctx.font = this.font + ' abc';
        ctx.fillStyle = this.fontColor;
        ctx.fillText(this.data[i].data / this.data[0].total * 100 + '%', this.lineWidth * 2 + this.lineWidth * i * 3 - this.lineWidth / 5, this.lineWidth * 2 + this.lineWidth / 5);

        ctx.font = this.font + ' abc';
        ctx.fillStyle = this.fontColor;
        ctx.fillText(this.data[i].totalLabel + ' : ' + this.data[i].total, this.lineWidth * 2 + this.lineWidth * i * 3 - this.lineWidth / 5, this.lineWidth / 2.5);
        ctx.font = this.font + ' abc';
        ctx.fillStyle = this.fontColor;
        ctx.fillText(this.data[i].label + ' : ' + this.data[i].data, this.lineWidth * 2 + this.lineWidth * i * 3 - this.lineWidth / 5, this.lineWidth / 1.5);
      }

      for (var i = 0; i < this.data.length; i++) {
        ctx.beginPath();
        ctx.arc(this.lineWidth * 2 + this.lineWidth * i * 3, this.lineWidth * 2, this.lineWidth, 0, this.data[i].data / this.data[0].total * 2 * Math.PI, false);
        ctx.lineWidth = this.lineWidth / 10;
        ctx.strokeStyle = colors[i];
        ctx.stroke();
        ctx.closePath();
      }
    }
  }
}).call(this);


// instructions

// var data = [
//   {
//     label: 'a',
//     data: 20
//   },
//   {
//     label: 'b',
//     data: 20
//   }
// ]
//   var data = [
//     {
//       label: 'a',
//       data: 90,
//       total: 100,
//       totalLabel: 'a总量'
//     },
//     {
//       label: 'b',
//       data: 20,
//       total: 100,
//       totalLabel: 'b总量'
//     }
//   ];
