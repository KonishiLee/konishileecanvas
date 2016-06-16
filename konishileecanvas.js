/*
 *httpps://github.com/konishilee/konishileecanvas
 *Author: KonishiLee
 *Date: 20160618
 */
 (function(){
  var ctx;
  var baseColor = '#ccc';
  var colors = [
    '#12DB8A',
    '#FDE068',
    '#FDB485',
    '#F18F73',
    '#7FCAFF',
    '#88B9F7',
    '#31CBE8',
    '#4DDAC2',
    '#4EC469',
    '#F8668A'
  ];

  var opts = {
    baseColor: baseColor, //底色
    colors: colors, //颜色数组
    data: [], //数据
    lineWidth: 20, //图标宽度
    height: 100, //高度
    font: '20px', //字体大小
    fontColor: '#666666'
  };

  function setOptions(obj, opt){
    obj.data = opt.data || opts.data;
    obj.lineWidth = opt.lineWidth || opts.lineWidth;
    obj.height = opt.height || opts.height;
    obj.baseColor = opt.baseColor || opts.baseColor;
    obj.colors = opt.colors || opts.colors;
    obj.font = opt.font || opts.font;
    obj.fontColor = opt.fontColor || opts.fontColor;
  }

  var KCanvas = window.KCanvas = function(element, options) {
    ctx = element.getContext('2d');
    setOptions(this, options);
  };

  KCanvas.prototype = {
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
        ctx.fillText(parseInt(this.data[i].data / this.data[i].total * 100)+ '%', this.lineWidth * 2 + this.lineWidth * i * 3 - this.lineWidth / 5, this.lineWidth * 2 + this.lineWidth / 5);

        ctx.font = this.font + ' abc';
        ctx.fillStyle = this.fontColor;
        ctx.fillText(this.data[i].totalLabel + ' : ' + this.data[i].total, this.lineWidth * 1.2 + this.lineWidth * i * 3 - this.lineWidth / 5, this.lineWidth / 4);
        ctx.font = this.font + ' abc';
        ctx.fillStyle = this.fontColor;
        ctx.fillText(this.data[i].label + ' : ' + this.data[i].data, this.lineWidth * 1.2 + this.lineWidth * i * 3 - this.lineWidth / 5, this.lineWidth / 1.5);
      }

      for (var i = 0; i < this.data.length; i++) {
        ctx.beginPath();
        ctx.arc(this.lineWidth * 2 + this.lineWidth * i * 3, this.lineWidth * 2, this.lineWidth, 0, this.data[i].data / this.data[i].total * 2 * Math.PI, false);
        ctx.lineWidth = this.lineWidth / 10;
        ctx.strokeStyle = this.colors[i];
        ctx.stroke();
        ctx.closePath();
      }
    },

    clear: function(x,y,width,height) {
      ctx.clearRect(x,y,width,height);
    }
  };

  var Vertical = function(element, opt) {
    setOptions(this, opt);
    this.ctx = element.getContext('2d');
    this.total = 0;
    this.x = [];
    this.y = [];
    this.w = 0;
    this.h = 0;
    this.widths = 0;
    this.score = [];
  };

  var Horizontal = function(element, opt) {
    setOptions(this, opt);
    this.ctx = element.getContext('2d');

    this.total = 0;
    this.x = [];
    this.y = [];
    this.w = 0;
    this.h = 0;
    this.widths = 0;
    this.score = [];
  };

  Vertical.prototype = {
    text: function(){
      for (var i = 0; i < this.data.length; i++) {
        this.x.push(i * this.lineWidth * 4 + this.lineWidth);
        this.y.push(this.lineWidth * 2);
        this.w = this.lineWidth;
        this.h = this.height;
        this.ctx.font = this.font + ' abc';
        this.ctx.fillStyle = this.fontColor;
        this.ctx.fillText(this.data[i].data,
          this.x[i],
          this.w * 1.5);

        this.ctx.font = this.font + ' abc';
        this.ctx.fillStyle = this.fontColor;
        this.ctx.fillText(this.data[i].label,
          this.x[i],
          this.h + this.w * 2 + this.w / 2 + 10);
        this.total += this.data[i].data;
      }

      for (var i = 0; i < this.data.length; i++) {
        this.score.push(this.data[i].data / this.total * this.height);
      }
    },

    clear: function(){
      for (var i = 0; i < this.data.length; i++) {
        this.ctx.fillStyle = baseColor;
        this.ctx.fillRect(this.x[i], this.y[i], this.w, this.h);
      }
    },

    draw: function(){
      this.widths += 2;
      for (var i = 0; i < this.data.length; i++) {
        if (this.score[i] >= this.widths) {
          this.ctx.fillStyle = this.colors[i];
          this.ctx.fillRect(this.x[i],
              this.h - this.widths + this.w * 2,
              this.w,
              this.widths);
        }
      }
    },

    animloop: function(){
      this.draw();
      this.widths < this.h && window.setTimeout(this.animloop.bind(this), 2000 / 60);
    },

    load: function(){
      this.text();
      this.clear();
      this.animloop();
    }
  }

  Horizontal.prototype = {
    text: function(){
      for (var i = 0; i < this.data.length; i++) {
        this.x.push(this.lineWidth * 3 + this.lineWidth);
        this.y.push(this.lineWidth * i * 2 + this.lineWidth);
        this.w = this.lineWidth;
        this.h = this.height;

        this.ctx.font = this.font + ' abc';
        this.ctx.fillStyle = this.fontColor;
        this.ctx.fillText(this.data[i].data,
          this.w * 5.5 + this.h,
          i * this.w * 2 + this.w * 1.8);

        this.ctx.font = this.font + ' abc';
        this.ctx.fillStyle = this.fontColor;
        this.ctx.fillText(this.data[i].label,
          this.w * 2,
          i * this.w * 2 + this.w * 1.8);

        this.total += this.data[i].data;
      }

      for (var i = 0; i < this.data.length; i++) {
        this.score.push(this.data[i].data / this.total * this.height);
      }
    },

    clear: function(){
      for (var i = 0; i < this.data.length; i++) {
        this.ctx.fillStyle = baseColor;
        this.ctx.fillRect(this.x[i], this.y[i], this.h, this.w);
      }
    },

    draw: function(){
      this.widths += 2;
      for (var i = 0; i < this.data.length; i++) {
        console.log(this.score[i]);
        if (this.score[i] >= this.widths) {
          this.ctx.fillStyle = this.colors[i];
          this.ctx.fillRect(this.x[i],
            this.y[i],
            this.widths,
            this.w);
        }
      }
    },

    animloop: function(){
      this.draw();
      this.widths < this.h && window.setTimeout(this.animloop.bind(this), 2000 / 60);
    },

    load: function(){
      this.text();
      this.clear();
      this.animloop();
    }
  }

  KCanvas.Vertical = Vertical;
  KCanvas.Horizontal = Horizontal;
  module.exports = KCanvas;
}).call(this);



