/**
 * miSlider
 * Version: 0.1.11
 * URL: private
 * Description: A multi-item slider for displaying one or more items per slide
 * Requires: jQuery
 * Optional: Modernizr
 * Author: jbowyers
 * Copyright: 2014-2015 jbowyers
 * License: This file is part of miSlider.这个文件是miSlider的一部分。
 * miSlider is free software: you can redistribute it and/or modify
 * miSlider是自由软件:你可以重新分配它和/或修改。
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * miSlider is distributed in the hope that it will be useful,miSlider 是分布式的，希望它是有用的，
 * but WITHOUT ANY WARRANTY; without even the implied warranty of  但是没有任何保修;甚至没有隐含的保证
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.GNU通用公共许可证的更多细节。
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see http://www.gnu.org/licenses/
 */

;(function( $, window, document, Math, undefined ) {

"use strict";

var MiSlider = function( stageEl, options ) {

	// Clone miSlider object
	var o = this;

	// Initialize option defaults ==============================================
	o.optionsInit = {

		// The speed of the slide transition in milliseconds. Options: positive integer.
		speed:700,

		// slide pause time between transitions in milliseconds.
		// Options: false, positive integer. false = Autoplay off.自动播放关闭
		pause: false,


		// The number of slides to increment with Autoplay and Nav Buttons.通过自动放置和导航按钮增加的幻灯片数量
		// Options: positive or negative integer. Positive integer = Slide left.正的或负的整数。正整数=幻灯片左侧。
		// Negative integer = Slide right.向右滑动
		increment: 1,

		// The height of the stage in px. Options: false or positive integer/正整数.
		// false = height is calculated using maximum slide heights高度是利用最大滑动高度来计算的.
		stageHeight:false,

		// Number of slides visible at one time.
		// 一次可看到的幻灯片数 Options: false or positive integer.
		// false = Fit as many as possible.
		slidesOnStage: 1,

		// Continuous motion 连续运动- Boolean. true = slides loop in one direction if possible 如果可能的话，在一个方向上滑动.
		slidesContinuous: true,

		// The location of the current slide on the stage. Options: "left", "right", "center"
		// 当前幻灯片的位置在舞台上。选项:“左”、“右”、“中心”.
		slidePosition: "center",

		// The slide to start on. Options: "beg", "mid", "end"
		// or slide number starting at 1 - "1","2","3", etc.
		slideStart: "beg",

		// The width of the current slide in px. Options: false or positive integer.
		// 当前幻灯片的宽度是px。选项:假或正整数
		// false = width is the maximum of the existing slide widths.
		// 宽度是现有滑动宽度的最大值
		slideWidth: false,


		// The relative percentage scaling factor of the current slide other slides are scaled down.
		// Options: positive number 100 or higher. 100 = No scaling.
		//其他幻灯片的相对比例缩放系数减小。选项:正数100或更高。100 =没有缩放
		slideScaling:150,

		// The vertical offset of the slide center as a percentage of slide height.
		// 滑动中心的垂直偏移量为滑动高度的百分比。
		// Options:  positive or negative number.
		// 选项:正数或负数 Neg value负值 = up. Pos value正值 = down. 0 = No offset不偏移.
		offsetV: 0,

		// Center slide contents vertically - Boolean.中心滑动内容垂直-布尔值
		centerV: false,

		// Enable numbered list navigation - Boolean.
		// 启用编号列表导航-布尔值。
		navList:true,

		// Enable prev and next button navigation - Boolean.启用prev和next按钮导航- Boolean。
		navButtons:false,

		// Always show prev and next button navigation except when transitioning - Boolean.总是显示prev和next按钮导航，除非转换-布尔值。
		navButtonsShow: true,

		// Opacity of the prev and next button navigation when not transitioning.当不转换时，prev和next按钮导航的不透明度。
		// Options: Number between 0 and 1. 0 (transparent) - 1 (opaque).选项:0到1之间的数字。0(透明)- 1(不透明)。
		navButtonsOpacity: 1,

		// Randomize the order of the slides - Boolean.
		// 随机化幻灯片的顺序-布尔。
		randomize: false,

		// The slides loaded call back function - called when slides have loaded.
		// 当幻灯片加载时，加载的幻灯片调用返回函数。
		slidesLoaded: false,

		// The slide transition before call back function - called before the slide transition.
		// 在回调函数之前的幻灯片转换，在幻灯片转换之前调用。
		beforeTrans: false,


		// The slide transition complete call back function called at the end of a slide transition.
		//幻灯片转换完整的回调函数在幻灯片过渡结束时调用。
		afterTrans: false,


		// The CSS class that will be applied to the stage element.
		// 将应用于stage元素的CSS类。
		classStage: "mis-stage",

		// The CSS class that will be applied to the slider element.
		// 将应用于滑块元素的CSS类。
		classSlider: "mis-slider",


		// The CSS class that will be applied to each slide element.
		// 将应用于每个幻灯片元素的CSS类。
		classSlide: "mis-slide",


		// The CSS class that will be applied to the parent of the prev and next button navigation elements.
		//将应用于prev和next按钮导航元素的父类的CSS类。
		classNavButtons: "mis-nav-buttons",

		// The CSS class that will be applied to the parent of the numbered list navigation elements
		//将应用于编号列表导航元素的父类的CSS类。

		classNavList: "mis-nav-list",

		// The selector used to select the slider element - Descendant of the
		// 选择器用于选择舞台上的滑块元素。
		selectorSlider: "ol",

		// The selector used to select each slide element - Descendant of the slider
		// 用于选择滑块的每个幻灯片元素的选择器
		selectorSlide: "li"
	};

	// Define objects and vars =================================================

	// Objects -----------------------------------------------------------------

	// Merged options
	o.options = {};
	// slider container element
	o.stage = false;
	// slider element - container for slides+
	o.slider = false;
	// The collection of slides
	o.slides = false;
	// The nav buttons element
	o.navButtons = false;
	// The "previous" nav button
	o.prev = false;
	// The "next" nav button
	o.next = false;
	// The nav list element导航列表元素
	o.navList = false;
	// The nav list items collection导航列表项集合
	o.navListItems = false;
	// Current slide当前的幻灯片
	o.slideCurrent = false;
	// A collection of all the elements that animate
	// 所有动画元素的集合。
	o.animatedElements = $();

	// Calculated Widths and Heights 计算宽度和高度-------------------------------------------

	// The existing width of the stage
	// 舞台的现有宽度。
	o.stageWidth = 0;
	// The calculated height of stage
	// ：计算阶段的高度。
	o.stageHeight = 0;
	// The calculated width of slider
	// 滑动条的计算宽度
	o.sliderWidth = 0;
	// Slide calculated width of non-current slides
	// 滑动计算宽度的非当前幻灯片。
	o.slideWidth = 0;
	// Slide calculated width of current slide
	// 滑动计算的当前幻灯片宽度。
	o.slideWidthCurrent = 0;

	// Calculated Scaling vars -------------------------------------------------

	// The calculated relative percentage scaling factor of the current slide 计算了当前滑坡的相对比例系数。
	o.slideScaling = o.optionsInit.slideScaling;
	// The calculated scaling width
	o.scalingWidth = 0;
	// The calculated scaling margin计算比例保证金
	o.scalingMargin = 0;
	// The vertical offset of the slide center幻灯片中心的垂直偏移量。
	o.offsetV = o.optionsInit.offsetV;

	// Slide counts ------------------------------------------------------------

	// The original number of slides in collection  ：收集的幻灯片的原始数量
	o.slidesLengthOrig = 0;
	// The number of slides in collection including cloned slides  包括克隆幻灯片在内的系列幻灯片的数量。
	o.slidesLength = 0;
	// Current slide index  当前幻灯片指数
	o.indexCurrent = 0;
	// The index of the first unique slide 第一张唯一的幻灯片的索引。
	o.indexFirst = 0;
	// The index of the last unique slide  最后一张唯一的幻灯片的索引。
	o.indexLast = 0;
	// The calculated number of slides to increment with Autoplay and Nav Buttons
	// 通过自动放置和导航按钮，计算出的幻灯片数量。
	o.increment = o.optionsInit.increment;
	// The calculated number of slides on stage  ：
	// 在舞台上计算的幻灯片数。
	o.slidesOnStage = o.optionsInit.slidesOnStage;

	// Slider settings --------------------------------------------------------

	// The calculated speed 计算的速度
	o.speed = o.optionsInit.speed;
	// The calculted Nav Buttons opacity  计算导航按钮的不透明度。
	o.navButtonsOpacity = o.optionsInit.navButtonsOpacity;
	// The calculated prev and next button navigation fade boolean  计算的prev和next按钮的导航消失了布尔值。
	o.navButtonsFade = false;
	// The calculated continuous motion Boolean. 计算的连续运动布尔值。
	o.slidesContinuous = o.optionsInit.slidesContinuous;
	// The normalized pause value  归一化暂停价值
	// o.pause = o.optionsInit.pause;
	o.pause = false;
	// Functions --------------------------------------------------------------

	// Interval timer function
	o.timer = false;
	// Window resize timer function
	o.resizeTimer = false;
	// Temporary after transition callback function
	o.after = false;

	// Classes ----------------------------------------------------------------

	// Class applied to the cloned slides
	o.classSlideClone = "mis-clone";
	// Class of slide container - inserted around the contents of each slide
	o.classSlideContainer = "mis-container";
	// Class applied to the the current slides and current nav list item
	o.classCurrent = "mis-current";
	// Class applied to the the "previous" button
	o.classPrev = "mis-prev";
	// Class applied to the the "next" button
	o.classNext = "mis-next";

	// Initiate slider ========================================================
	o.init = function( stageEl, options ) { // Must only be called once

		// Set options
		o.options = $.extend( {}, o.optionsInit, options );

		// Initiate elements
		o.stage = $( stageEl );
		// Hide everything while we get setup
		o.stage.fadeTo( 0, 0 );
		// Only one slider per stage每个阶段只有一个滑块。
		o.slider = o.stage.children( o.options.selectorSlider ).first();
		o.slides = o.slider.children( o.options.selectorSlide );
		o.slidesLengthOrig = o.slides.length;
		o.animatedElements = o.animatedElements.add( o.slider ).add( o.slides );

		// Initiate current index
		if ( String( o.options.slideStart ) === "beg" ) {
			o.indexCurrent = 0;
		} else if ( String( o.options.slideStart ) === "mid" ) {
			o.indexCurrent = Math.ceil( o.slidesLengthOrig / 2 ) - 1;
		} else if ( String( o.options.slideStart ) === "end" ) {
			o.indexCurrent = o.slidesLengthOrig - 1;
		} else if ($.isNumeric( o.options.slideStart ) &&
			parseInt( o.options.slideStart, 10 ) <= o.slidesLengthOrig &&
			parseInt( o.options.slideStart, 10 ) > 0) {
				o.indexCurrent = parseInt( o.options.slideStart, 10 ) - 1;
		} else {
			o.indexCurrent = 0;
		}

		// Randomize slides随机的幻灯片
		if ( o.options.randomize ) {
			o.randomize();
		}

		// Add classes to stage and slider将类添加到stage和slider。
		if ( !o.stage.hasClass( o.options.classStage ) ) {
			o.stage.addClass( o.options.classStage );
		}
		if ( !o.slider.hasClass( o.options.classSlider ) ) {
			o.slider.addClass( o.options.classSlider );
		}

		// Normalize static options
		if ( o.options.speed && $.isNumeric( o.options.speed ) ) {
			o.speed = Math.abs( parseInt( o.options.speed, 10 ) );
		}
		if ( o.options.pause === false ) { // Note: 0 must return true
			o.pause = false;
		} else if ( $.isNumeric( o.options.pause ) ) {
			o.pause = Math.abs( parseInt( o.options.pause, 10 ) );
		}
		if ( $.isNumeric( o.options.offsetV ) ) {
			o.offsetV = Number( o.options.offsetV );
		}
		if ($.isNumeric(o.options.navButtonsOpacity) &&
			Number(o.options.navButtonsOpacity) >= 0 &&
			Number(o.options.navButtonsOpacity) <= 1) {
				o.navButtonsOpacity = Number( o.options.navButtonsOpacity );
		}

		// Initiate calculated scaling factor
		if ( $.isNumeric( o.options.slideScaling ) && Number( o.options.slideScaling ) >= 100 ) {
			o.slideScaling = Number( o.options.slideScaling );
		}
		// if CSS transforms are not supported
		if ( !supportTransform( stageEl ) ) {
			o.slideScaling = 100;
		}
		o.optionsInit.slideScaling = o.slideScaling;

		// Initiate the calculated increment
		if ( $.isNumeric( o.options.increment ) && parseInt( o.options.increment, 10 ) !== 0 ) {
			o.increment = parseInt( o.options.increment, 10 );
			o.optionsInit.increment = o.increment;
		}


		// Add previous and next nav buttons
		if ( o.options.navButtons ) {
			o.addNavButtons( o.stage );
			o.animatedElements = o.animatedElements.add( o.navButtons );
			if ( !o.options.navButtonsShow ) {
				o.navButtonsFade = true;
			}
		}

		// Add numbered list navigation
		if ( o.options.navList ) {
			o.addNavList();
		}

		// Set up the slider
		o.setup();

		// Add event handlers ---------------------------------------------------

		// Add click events to slides
		if ( o.slidesOnStage > 1 ) {
			o.slider.on( "click", o.options.selectorSlide, function( e ) {
				if ( $( this ).index() !== o.indexCurrent ) {
					e.preventDefault();
					o.autoplayOff();
					o.transition( $( this ).index(), false, o.autoplayOn( o.increment ) );
				}
			});
		}

		// Add hover events for controling Autoplay and Nav Button opacity
		if ( o.pause !== false || o.navButtonsFade ) { // Note: 0 must return true for o.pause
			o.stage.on({
				"mouseenter": function() {
					if ( o.pause !== false ) {
						o.autoplayOff();
					}
					if ( o.navButtonsFade ) {
						if ( !o.animatedElements.is( ":animated" ) ) {
							o.navButtons.fadeTo( 400, o.navButtonsOpacity );
						} else {
							if ( $.isFunction( o.after ) ) {
								var after = o.after;
								o.after = function() {
									after();
									o.navButtons.fadeTo( 400, o.navButtonsOpacity );
								};
							} else {
								o.after = function() {
									o.navButtons.fadeTo( 400, o.navButtonsOpacity );
								};
							}
						}
					}
				},
				"mouseleave": function() {
					if ( o.pause !== false ) {
						o.autoplayOn( o.increment );
					}
					if ( o.navButtonsFade ) {
						o.navButtons.fadeTo( 100, 0 );
					}
				}
			});
		}

		// Window events
		$( window ).on({

			// Wait for slides to load before setting up slides and nav buttons
			"load": function() {

				// Setup slides and nav buttons
				o.slideSetup();
				o.updateNavButtons();

				// Fade in everything
				o.stage.fadeTo( 600, 1 );

				// Autoplay slides if enabled
				o.autoplayOn( o.increment );

				// Slides loaded callBack
				if ( $.isFunction( o.options.slidesLoaded ) ) {
					o.options.slidesLoaded();
				}
			},

			// Reset Slider on screen resize
			// 设置屏幕大小调整滑块。
			"resize": function() {
				o.autoplayOff();
				clearTimeout( o.resizeTimer );
				o.resizeTimer = setTimeout(o.resetSlider, 500 );
			}
		});

		return this;
	};

	// Setup slider ============================================================
	o.setup = function() {

		var slidesMaxNum,
			incrementTest,
			slidesOffStage;

		// Set Slides length
		o.slidesLength = o.slidesLengthOrig;
		o.indexLast = o.slidesLength - 1;

		// Get widths, heights, add slide class and container
		o.slides.each( function() {
			var width,
				height,
				slide = $(this);

			// Add slide class to slide  給slide添加类
			if ( !slide.hasClass( o.options.classSlide ) ) {
				slide.addClass( o.options.classSlide );
			}

			// Add slide container to slide
			if ( !slide.children().hasClass( o.classSlideContainer ) ) {
				slide.wrapInner( "<div class='" + o.classSlideContainer + "'></div>" );
			}

			// Get widths and heights  获得宽高
			width = slide.outerWidth();
			height = slide.outerHeight()+80;

			if ( width > o.slideWidthCurrent ) {
				o.slideWidthCurrent = width;
			}
			if ( height > o.stageHeight ) {
				o.stageHeight = height;
			}

		});

		// Apply presets if they exist应用预设，如果它们存在。
		if ( $.isNumeric( o.options.slideWidth ) && parseInt( o.options.slideWidth, 10 ) > 0 ) {
			o.slideWidthCurrent = parseInt( o.options.slideWidth, 10 );
		}
		if ( $.isNumeric( o.options.stageHeight ) && parseInt( o.options.stageHeight, 10 ) > 0 ) {
			o.stageHeight = parseInt( o.options.stageHeight, 10 );
		}

		// Use modulus hack to ensure current index is within range
		// 使用模量hack确保当前索引在范围内。
		o.indexCurrent = normalizeIndex( o.indexCurrent );

		// Set the stage -------------------------------------------------------

		// Set CSS
		o.stage.css({
			"height": o.stageHeight
		});

		// Get Stage width - must do this after setting height
		// 获得舞台宽度-在设定高度后必须这样做。
		o.stageWidth = o.stage.outerWidth();

		// Calculate slide scaling, widths, increment and slides on and off stage
		// 计算幻灯片的缩放比例，宽度，增量和幻灯片的上下级

		// Determine the maximum number of slides that fit on the stage
		// 确定在舞台上的幻灯片的最大数量。
		slidesMaxNum = Math.floor( ( o.stageWidth - o.slideWidthCurrent ) /
			( o.slideWidthCurrent * 100 / o.slideScaling ) ) + 1;

		// Must have at least 1至少有一个
		slidesMaxNum = ( slidesMaxNum < 1 ) ? 1 : slidesMaxNum;

		// Calculate the number of slides visible on the stage
		// 计算在舞台上可见的幻灯片的数量。
		o.slidesOnStage = slidesMaxNum;  // Fit as many as possible
		if ($.isNumeric( o.options.slidesOnStage ) &&
			parseInt( o.options.slidesOnStage, 10 ) >= 1 &&
			parseInt( o.options.slidesOnStage, 10 ) <= slidesMaxNum) {
				// Use existing options value
				o.slidesOnStage = parseInt( o.options.slidesOnStage, 10 );
		}
		if ( o.options.slidePosition === "center" ) {
			// need odd number for centered layout为中心布局需要奇数。
			o.slidesOnStage = ( Math.ceil( o.slidesOnStage / 2 ) * 2 ) - 1;
		}

		// The absolute increment number should not be greater than slides on stage
		// 绝对递增数不应大于舞台上的幻灯片。
		incrementTest = ( o.increment + o.slidesOnStage ) / 2;
		if ( incrementTest > o.slidesOnStage ) { // increment is positive and more than slides on stage增量是正的，而不是在舞台上的幻灯片。
			o.increment = o.slidesOnStage;
		} else if ( incrementTest < 0 ) { // increment is negative and more than slides on stage递增是负的，而不是在舞台上的幻灯片
			o.increment = -( o.slidesOnStage );
		}

		// Calculate the current and non-current slide widths计算当前和非当前的滑动宽度
		if ( o.slidesOnStage > 1 ) {
			// modify non-current slide width to accommodate correct number of slides on the stage
			// 修改非当前的幻灯片宽度，以容纳正确数量的幻灯片在舞台上。
			o.slideWidth = ( o.stageWidth - o.slideWidthCurrent ) / ( o.slidesOnStage - 1 );
			if ( o.slideWidthCurrent < o.slideWidth && !o.options.slideWidth ) {
				// Set slideWidth and slideWidthCurrent to be the same
				// 设置slideWidth和slideWidthCurrent是相同的。
				o.slideWidth = o.stageWidth / o.slidesOnStage;
				o.slideWidthCurrent= o.slideWidth;

			}
		} else {
			// Make slide widths full width of stage
			// 使滑动宽度达到舞台的宽度。
			o.slideWidth = o.stageWidth;
			o.slideWidthCurrent = o.slideWidth;
			o.slideScaling = 100;
		}

		// Set scaling width and margin设置缩放宽度和边距。
		o.scalingWidth = o.slideWidth * o.slideScaling / 100;
		o.scalingMargin = ( o.slideWidth - o.scalingWidth )/2;

		// Determine the number of slides off stage
		// 确定舞台上的幻灯片数量。
		slidesOffStage = o.slidesLengthOrig - o.slidesOnStage;

		// Clone last slidesToClone slides to beginning and first slidesToClone slides to end
		// 克隆的最后一个幻灯片，开始和第一个slidesToClone幻灯片结束。
		if ( slidesOffStage >= 0 && o.options.slidesContinuous ) {

			// Set calculated continuous motion boolean to true
			// 设置计算连续的布尔值为真。
			o.slidesContinuous = true;

			// Determine the number of slides to clone
			// 确定要克隆的幻灯片数量。
			o.slidesToClone = o.slidesOnStage + Math.abs( o.increment ) - 1;

			// Prepend last slidesToClone slides
			// 预先考虑去年slidesToClone幻灯片
			o.slides
				.slice( o.slidesLength - o.slidesToClone )
					.clone()
					.addClass( o.classSlideClone )
					.removeAttr( "id" )
					.prependTo( o.slider )
					.find( "*" )
						.removeAttr( "id" );

			// Append first slidesToClone slides
			// 添加第一个slidesToClone幻灯片
			o.slides
				.slice( 0, o.slidesToClone )
					.clone()
					.addClass( o.classSlideClone )
					.removeAttr( "id" )
					.appendTo( o.slider )
					.find( "*" )
						.removeAttr( "id" );

			// Adjust indexes
			o.indexFirst = o.slidesToClone;
			o.indexLast = o.slidesLength + o.slidesToClone - 1;
			o.indexCurrent = o.indexCurrent + o.slidesToClone;

			// Refresh slides  刷新的幻灯片
			o.slides = o.slider.children( o.options.selectorSlide );
			o.slidesLength = o.slides.length;

		} else {
			o.slidesContinuous = false;
		}

		// Update current slide更新当前的幻灯片
		o.slideCurrent = o.slides.eq( o.indexCurrent );

		// Set the horizontal position, width and other CSS of the slider
		// -设置滑块的水平位置、宽度和其他CSS。-----

		// Calculate the width of the slider
		// 计算滑块的宽度。
		o.sliderWidth = o.slideWidthCurrent + ( o.slideWidth * ( o.slidesLength - 1 ) ) + 1;

		// Set CSS of slider
		// 设置CSS的滑块
		o.slider
			.css({
				"left": leftOffsetter( o.indexCurrent ),
				"width": o.sliderWidth
			})
		;

		// update navList
		o.updateNavList( o.indexCurrent );
		return this;
	};

	// Transition control function =============================================
	o.transition = function( indexTo, beforeTrans, afterTrans, navButtonsFadeIn ) {

		// If slider is not animated and indexTo != current index - continue
		// 如果滑块没有动画和索引!=当前索引-继续。
		if ( !o.animatedElements.is( ":animated" ) && indexTo !== o.indexCurrent ) {

			// Define indexes that might be adjusted
			// 定义可以调整的索引。
			var indexDiff,
				indexToAdjusted = indexTo,
				indexCurrentAdjusted = o.indexCurrent;

			// Update indexes and slides if continuous and slides are out of bounds
			// 如果连续和幻灯片超出范围，更新索引和幻灯片。
			if ( o.slidesContinuous ) {

				// Get adjusted indexTo if slides are out of bounds
				// 如果幻灯片超出范围，请调整索引。
				if ( indexTo < o.indexFirst ) {
					indexToAdjusted = indexTo + o.slidesLengthOrig;
				} else if ( indexTo > o.indexLast ) {
					indexToAdjusted = indexTo - o.slidesLengthOrig;
				}

				if ( indexToAdjusted !== indexTo ) { // indexTo is out of bounds

					// Adjust current index调整当前索引
					indexCurrentAdjusted = o.indexCurrent + o.slidesLengthOrig;
					if ( indexToAdjusted < indexTo ) {
						indexCurrentAdjusted = o.indexCurrent - o.slidesLengthOrig;
					}
				}
			} else {
				// Use modulus hack to ensure adjusted index is within range
				// 使用模量hack确保调整后的指标在范围内。
				indexToAdjusted = normalizeIndex( indexTo );
			}

			// Get the normalized difference between indexes
			indexDiff = normalizeIndex( indexToAdjusted ) -
                normalizeIndex( indexCurrentAdjusted );

			// If adjusted indexTo != adjusted current index - do move ---------
			if ( indexDiff ) {

				// Define after transition function var
				// 定义转换函数var
				var after;

				// Call "before transition" functions调用转换之前的函数
				if ( $.isFunction( beforeTrans ) ) {
					beforeTrans();
				}
				if ( $.isFunction( o.options.beforeTrans ) ) {
					o.options.beforeTrans();
				}

				// Construct after transition function构建转换之后的函数
				after = function() {

					// Call afterTrans local function
					if ( $.isFunction( afterTrans ) ) {
						afterTrans();
					}

					// Call afterTrans pre-defined function
					if ( $.isFunction( o.options.afterTrans ) ) {
						o.options.afterTrans();
					}

					// Call temporary callback function
					if ( $.isFunction( o.after ) ) {
						o.after();
						o.after = false;
					}

				};

				// Swap current slide if continuous and current index needs to be adjusted
				// 如果连续和当前索引需要调整，则交换当前幻灯片。
				if ( o.slidesContinuous && indexCurrentAdjusted !== o.indexCurrent ) {

					var slideCurrentAdjusted = o.slides.eq( indexCurrentAdjusted );

					// Prepare Current slide's clone准备克隆当前幻灯片
					if ( o.slideScaling !== 100 ) {

						// Scale slide
						slideCurrentAdjusted.css({
							"transform": "scale(1)",
							"width": o.slideWidthCurrent,
							"marginLeft": "0",
							"marginRight": "0",
							// value placeholder used with step function to animate tranform
							// 值占位符，用于将阶跃函数用于动画转换。
							"borderSpacing": "100px"
						});

						// Vertically center slide if enabled
						// 如果启用，垂直中心滑动。
						if ( o.options.centerV ) {
							slideCurrentAdjusted.children().first().css({
								"marginTop": slideCurrentAdjusted.data( "slideMarginTopCurrent" )
							});
						}
					}

					// Add current class to current slide
					// 将当前类添加到当前幻灯片。
					slideCurrentAdjusted
						.addClass( o.classCurrent )
						.siblings()
							.removeClass( o.classCurrent );

					// Jump to Clone
					o.slider.css( "left", leftOffsetter( indexCurrentAdjusted ) );

					// Reset original
					if ( o.slideScaling !== 100 ) {

						// Scale slide
						o.slideCurrent.css({
							"transform": "scale(" + ( 100 / o.slideScaling ) + ")",
							"width": o.scalingWidth,
							"marginLeft": o.scalingMargin,
							"marginRight": o.scalingMargin,
							// value placeholder used with step function to animate tranform
							"borderSpacing": o.slideScaling
						});

						// Vertically center slide if enabled
						if ( o.options.centerV ) {
							o.slideCurrent.children().first().css({
								"marginTop": o.slideCurrent.data( "slideMarginTop" )
							});
						}
					}

					// Update current index and slide
					// 更新当前索引和幻灯片。
					o.indexCurrent = indexCurrentAdjusted;
					o.slideCurrent = o.slides.eq( o.indexCurrent );

				}

				// Transition --------------------------------------------------
				if ( o.navButtons ) {
					// FadeIn Nav Buttons before move if fadeIn bool true
					o.navButtons.fadeTo( 100, ( navButtonsFadeIn ) ? o.navButtonsOpacity : 0,
						function() {
							// FadeOut Nav Buttons before move
							o.navButtons.fadeTo( 100, 0, function() {
								// Do transition
								o.animateSlides( indexToAdjusted, function() {
									if ( o.stage.find( ":hover" ).length ||
										o.options.navButtonsShow ) {
										// FadeIn Nav Buttons after move
										o.navButtons.fadeTo( 400, o.navButtonsOpacity, after );
									} else {
										after();
									}

								});

							});
						}
					);
				} else {
					// Do transition
					o.animateSlides( indexToAdjusted, after );
				}
			}
		}
		return this;
	};

	// Animate slide transition ================================================
	o.animateSlides = function( indexTo, afterTrans ) {

		// Remove current class from current slide
		o.slideCurrent.removeClass( o.classCurrent );

		// Define the slide to move to
		var slideTo = o.slides.eq( indexTo );

		if ( o.slideScaling !== 100 ) { // only scale if needed

			// Scale New Slide -------------------------------------------------
			slideTo
				.animate({
					"marginLeft": "0",
					"marginRight": "0",
					"width": o.slideWidthCurrent
				}, {
					duration: o.speed,
					queue: false
				})
				.animate({
					"borderSpacing": "100px"
				}, {    // Must use step function to animate scaling
					step: function ( now ) {
						$( this ).css({
							"transform": "scale(" + 100 / now + ")"
						});
					},
					duration: o.speed,
					queue: false
				})
			;

			// Scale Current slide ---------------------------------------------
			o.slideCurrent
				.animate({
					"marginLeft": o.scalingMargin,
					"marginRight": o.scalingMargin,
					"width": o.scalingWidth
				}, {
					duration: o.speed,
					queue: false
				})
				.animate({
					"borderSpacing": o.slideScaling
				}, {
					// Must use step function to animate scaling
					step: function ( now ) {
						$( this ).css({
							"transform": "scale(" + 100 / now + ")"
						});
					},
					duration: o.speed,
					queue: false
				})
			;

			// Animate slide contents margin if vertically center slide is enabled
			// 如果启用垂直中心幻灯片，动画幻灯片内容页边距。
			if ( o.options.centerV ) {

				// Animate New Slide content
				slideTo
					.children()
						.first()
							.animate({
								"marginTop": slideTo.data( "slideMarginTopCurrent" )
							}, {
								duration: o.speed,
								queue: false
							});
				// Animate Current Slide content当前动画幻灯片内容
				o.slideCurrent
					.children()
						.first()
							.animate({
								"marginTop": o.slideCurrent.data( "slideMarginTop" )
							}, {
								duration: o.speed,
								queue: false
							});
			}
		}

		// Move to new slide -搬到新幻灯片--------------------------------------------------
		o.slider.animate({
			"left": leftOffsetter( indexTo )
		}, {
			duration: o.speed,
			queue: false,
			complete: function() {

				// transition complete

				// Update current index and slide
				o.indexCurrent = indexTo;
				o.slideCurrent = slideTo;

				// update navList
				o.updateNavList( indexTo );

				// Add current class to current slide
				o.slideCurrent
					.addClass( o.classCurrent )
					.siblings()
						.removeClass( o.classCurrent )
				;

				// Execute callbacks
				if ( $.isFunction( afterTrans ) ) {
					afterTrans();
				}
			}
		});

		return this;
	};

	// Playback control functions ==============================================

	// Autoplay on -自動播放開------------------------------------------------------------
	o.autoplayOn = function( incr ) {
		if ( o.pause !== false ) { // autoplay is enabled

			// Reset timer
			clearInterval( o.timer );
			if ( !o.stage.find( ":hover" ).length ) {   // slider is not in hover state
				o.timer = setInterval(function() {
					// if not transitioning do transition
					if ( !o.animatedElements.is( ":animated" ) ) {
						o.transition( o.indexCurrent + incr );
					}
				}, o.pause );
			}
		}
		return this;
	};

	// Autoplay off ------------------------------------------------------------
	o.autoplayOff = function() {
		clearInterval( o.timer );
		return this;
	};

	// Add navButtons -添加navButtons----------------------------------------------------------
	o.addNavButtons = function( element ) {

		// Create Nav Buttons object and Parent element to append nav buttons to
		// 创建Nav按钮对象和父元素，以附加Nav按钮
		var navButtons,
			$el = $( element );

		// Construct HTML
		navButtons = $( "<div class='" +
			o.options.classNavButtons +
			"'><a href='#' class='" +
			o.classPrev +
			"'>Prev</a><a href='#' class='" +
			o.classNext +
			"'>Next</a></div>" );

		// Apply CSS and click events to buttons
		navButtons
			.css({
				"opacity": ( ( o.options.navButtonsShow ) ? o.navButtonsOpacity : 0 )
			})
			.children( "a" )
				.on( "click", function( e ) {
					e.preventDefault();
					if ( this.className === o.classPrev ) {
						o.autoplayOff();
						o.transition( o.indexCurrent - Math.abs( o.increment ),
							false, o.autoplayOn( o.increment ), true );
					} else if ( this.className === o.classNext ) {
						o.autoplayOff();
						o.transition( o.indexCurrent + Math.abs( o.increment ),
							false, o.autoplayOn( o.increment ), true );
					}
				});

		// Append buttons to stage添加按钮到頁面
		$el.append( navButtons );

		// Define cached objects
		o.navButtons = $el.find( "." + o.options.classNavButtons );
		o.prev = o.navButtons.find( "." + o.classPrev );
		o.next = o.navButtons.find( "." + o.classNext );

		return this;
	};

	// Update Nav Buttons 更新导航按钮------------------------------------------------------
	o.updateNavButtons = function() {
		if ( o.navButtons ) {
			// Apply CSS to buttons
			o.navButtons
				.css({
					"width": o.slideWidthCurrent,
					"left": ( o.slideCurrent.offset().left - o.stage.offset().left )
				})
				.children( "a" )
					.css({
						"height": o.stageHeight,
						"paddingTop": ( 50 + o.offsetV ) * o.stageHeight / 100
					})
			;
		}
	};

	// Add navList 添加navList--------------------------------------------------------------
	o.addNavList = function() {
		
		// Create temporary list object and list HTML var创建临时列表对象并列出HTML var。
		var navList,
			listHtml = "<ol class='" + o.options.classNavList + "'>";

		// Create each List item
		o.slides.each(function( index ) {

			// Create caption and list item text vars创建标题和列表项文本vars。
			var caption,
				itemText = index + 1;

			// Use header, figcaption, or img title as list item text instead使用标题、图标题或img标题作为列表项文本。
			caption = $( this ).find( ":header" ).sort(function( a, b ) {
				var aTag = $( a ).prop( "tagName" ),
					bTag = $( b ).prop( "tagName" );
				return parseInt( aTag.match( /\d+/ ), 10 ) - parseInt( bTag.match( /\d+/ ), 10 );
			}).eq( 0 ).html();
			if ( caption ) {
				itemText = caption;
			} else {
				caption = $( this ).find( "figcaption" ).eq( 0 ).html();
				if ( caption ) {
					itemText = caption;
				} else {
					caption = $( this ).find( "img" ).eq( 0 ).attr( "title" );
					if ( caption ) {
						itemText = caption;
					}
				}
			}

			// Add list item to list添加列表项到列表中
			listHtml += "<li><a href='#' title='" + itemText + "'>" + itemText + "</a></li>";

		});

		// Close list
		listHtml += "</ol>";

		// Define temporary list object and add click events  定义临时列表对象并添加单击事件。
		navList = $( listHtml )
			.on( "click", "li", function( e ) {
				e.preventDefault();
				if ( $( this ).index() !== ( o.indexCurrent - o.indexFirst ) ) {
					o.autoplayOff();
					o.transition( $( this ).index() + o.indexFirst, false, o.autoplayOn( o.increment ) );
				}
			})
		;

		// Prepend list to slider and update cached objects  Prepend列表到slider并更新缓存的对象。
		o.stage.prepend( navList );
		o.navList = o.stage.children().first();
		o.navListItems = o.navList.children( "li" );

		return this;
	};

	// Update navList 更新navList-----------------------------------------------------------
	o.updateNavList = function( index ) {
		if ( o.navListItems.length ) {
			o.navListItems
				.eq( index - o.indexFirst )
					.addClass( o.classCurrent )
					.siblings()
						.removeClass( o.classCurrent )
			;
		}
	};

	// Assorted functions ======================================================

	// Randomizer --------------------------------------------------------------
	o.randomize = function() {

		// Randomize cached slides
		o.slides.sort(function() {
			return ( 0.5 - Math.random() );
		});

		// Apply randomized slides to page
		o.slides.detach().appendTo( o.slider );

		return this;
	};

	// Reset Slider 复位滑块-----------------------------------------------------------
	o.resetSlider = function() {
		if ( o.animatedElements.is( ":animated" ) ) {

			// Reset slider after transition has finished
			if ( $.isFunction( o.after ) ) {
				var after = o.after;
				o.after = function() {
					after();
					o.resetSlider();
				};
			} else {
				o.after = o.resetSlider;
			}

		} else {

			// Resets
			o.autoplayOff();
			o.stage.removeAttr( "style" );
			o.slider.removeAttr( "style" );
			o.slides.removeAttr( "style" );
			o.slides.filter( "." + o.classSlideClone ).remove();
			o.slides = o.slider.children( o.options.selectorSlide );
			o.stageHeight = 0;
			o.slideWidthCurrent = 0;
			o.slideScaling = o.optionsInit.slideScaling;
			o.indexCurrent -= o.slidesToClone;
			o.indexFirst = 0;
			o.increment = o.optionsInit.increment;
			o.after = false;
			// Setup
			o.setup();
			o.slideSetup();
			o.updateNavButtons();
			o.autoplayOn( o.increment );
		}
		return this;
	};

	// Setup slides function -设置幻灯片的功能---------------------------------------------------
	o.slideSetup = function() {
		o.slides.each(function( i ) {

			var slide = $( this );

			// Set transform origin and current width  设置转换原点和当前宽度。
			slide.css({
				"transform-origin": "50% " + String( 50 + o.offsetV ) + "%",
				"width": o.slideWidthCurrent
			});

			// Get vertical slide offset if enabled  如果启用了垂直滑动偏移量。
			if ( o.options.centerV ) {
                getMarginTop( slide, "slideMarginTopCurrent" );
			}

			// Set non-current slides  设置非流动的幻灯片
			slide.css({
				"width": o.scalingWidth
			});
			if ( o.slideScaling !== 100 ) {
				slide.css({
					// compensation for scaling transform
					"marginLeft": o.scalingMargin,
					// compensation for scaling transform
					"marginRight": o.scalingMargin,
					"transform": "scale(" + ( 100 / o.slideScaling ) + ")",
					// value placeholder used with step function to animate tranform
					"borderSpacing": o.slideScaling
				});
			}

			// Vertically center slide if enabled  如果启用，垂直中心滑动。
			if ( o.options.centerV ) {
				slide.children().first().css({
					"marginTop": getMarginTop( slide, "slideMarginTop" )
				});
			}

			// Set current slides  设置当前的幻灯片
			if ( i === o.indexCurrent ) {
				slide
					.css({
						// value placeholder used with step function to animate tranform
						// "borderSpacing": "100px",
						"width": o.slideWidthCurrent,
						// compensation for scaling transform缩放变换补偿
						"marginLeft": 0,
						// compensation for scaling transform
						"marginRight": 0,
						"transform": "scale(1)"
					})
					.addClass( o.classCurrent )
					.siblings()
						.removeClass( o.classCurrent )
				;

				// Vertically center slide if enabled 如果启用，垂直中心滑动。
				if ( o.options.centerV ) {
					slide.children().first().css({
						"marginTop": getMarginTop( slide, "slideMarginTopCurrent" )
					});
				}
			}
		});
	};

    // Slider left offset calculator 滑块左偏移计算器------------------------------------------
    function leftOffsetter( index ) {

        var indexOffset = o.slideWidth * index * -1,
            leftOffset = indexOffset; // Slide position滑块位置 = Left

        if ( o.options.slidePosition === "center" ) {
            leftOffset = indexOffset + ( Math.floor( o.slidesOnStage / 2 ) * o.slideWidth );
        } else if (o.options.slidePosition === "right") {
            leftOffset = ( indexOffset + ( ( o.slidesOnStage - 1) * o.slideWidth ) );
        }

        return leftOffset;
    }

	// Get offset for centering slide contents vertically within stage
	// 在舞台的垂直方向上，以垂直方向偏移。
	// Must be called after contents (images) have loaded to get correct height
	// 必须在内容(图像)加载后才能得到正确的高度?
	function getMarginTop( slide, dataKey ) {

		// Get height of slide container获得滑动容器的高度。
		var height = slide.children().first().outerHeight(),
				slideMarginTop = 0;

		// Add negative top margin if slide height is bigger than stage height
		// 如果滑动高度大于舞台高度，则添加负上页边距。
		if (height > o.stageHeight) {
			slideMarginTop = ( o.stageHeight - height ) / 2;
		}

		// Store slide's top margin value for re-use存储幻灯片的最高边际价值的重用。
		slide.data( dataKey, slideMarginTop );

		return slideMarginTop;
	}

    // Use modulus hack to make sure index is within range -使用模量hack确保索引在范围之内。---------------------
    function normalizeIndex( index ) {
        index = ( ( index % o.slidesLengthOrig ) + o.slidesLengthOrig ) % o.slidesLengthOrig;
        return index;
    }
	// Test transform feature support测试转换特性支持
	function supportTransform( element ) {
		var test = false;
		// Use Modernizr if it exists使用现代化，如果它存在
		if ( typeof Modernizr !== 'undefined' ) {
			if ( Modernizr.csstransforms ) {
				test = true;
			}
		} else {
			var style = element.style;
			if (typeof style.transform !== "undefined" ||
				typeof style.WebkitTransform !== "undefined" ||
				typeof style.msTransform !== "undefined") {
					test = true;
			}
		}
		return test;
	}

	// initialize ----------------------------------------------------------------
	o.init( stageEl, options );

	return this;
};

// Create a jQuery plugin 创建一个jQuery插件======================================================
$.fn.miSlider = function( options ) {

	// Enable multiple-slider support
	return this.each(function() {
		var stage = $( this );
		if ( !stage.data( "miSlider" ) ) {
			stage.data( "miSlider", new MiSlider( this, options ) );
		}
	});
};
})( jQuery, window, document, Math );