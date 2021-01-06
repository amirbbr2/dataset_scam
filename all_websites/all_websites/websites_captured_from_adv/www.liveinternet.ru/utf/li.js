/* Global object
----------------------------------------------- */
     LI = {}
    
     LI.showhide = function( e ) {
          if (e.style.display == 'none') e.style.display = 'block'
          else e.style.display = 'none'
     }
    
     if (LiCi.$(':gl_Top')) LI.isPartner = false
     else LI.isPartner = true
    

/* Menu
----------------------------------------------- */
     LI.menu = {
          /* -----------[ Create/delete menu ]----------- */
               show : function (e,hdr,body) {
                    /* -[ Menu element ]- */
                         var id = e.id+'_menu';
                         var elem = LiCi.$(id);
                    /* -[ If defined – delete ]- */                   
                         if (elem) {
                              if (id != ':gl_Top-nav-user-info-lnk-itemLogin_menu')
                              {
                                   elem.parentNode.removeChild(elem);
                              /* -[ Enable flash ]- */
                                   if (LiCi.$('bantop_span')) {
                                        LiCi.$('bantop_span').style.display = 'block';
                                   }                             
                                   if (LiCi.$('bantop_span_new')) {
                                        LiCi.$('bantop_span_new').style.display = 'block';
                                   }                                                                
                              }
                         }
                    /* -[ If undefined – remove ]- */         
                         else {
                              /* -[ Disable flash ]- */
                                   var theObject = document.getElementById('bantop_span');
                                   if (theObject)
                                        theObject.style.display = 'none';
                                   var theObjectNew = document.getElementById('bantop_span_new');
                                   if (theObjectNew)
                                        theObjectNew.style.display = 'none';                                       
                              /* -[ Position ]- */
                                   var top = LiCi.offset.top(e) + LiCi.elemHeight(e);
                                   //var left = LiCi.offset.left(e) - LiCi.elemWidth(e);
                                   var left = LiCi.offset.left(e) - 50;
                                   var wrapper = document.createElement('div');
                                   var cl = 'gl_Menu';
                              /* -[ Creating ]- */
                                   wrapper.id = id;
                                   wrapper.className = cl;
                                   wrapper.style.position = 'absolute';
                                   wrapper.style.top = top+'px';
                                   wrapper.style.left = left+'px';
                                   wrapper.style.zIndex = 777;
                                   LiCi.$(':gl_Body').appendChild(wrapper);
                                   LiCi.$(id).innerHTML = '<div class="'+cl+'T"></div><div class="'+cl+'I"><b class="'+cl+'-hdr">'+hdr+'</b>'+body+'</div><div class="'+cl+'B"></div>';
                         }
               }
     }
     
/* Popup
----------------------------------------------- */     
	LI.popup = {
		show : function(title, body, e) {
			// Parent
				var parent = document.createElement('div');
				parent.className = 'li-popup';
				document.body.appendChild( parent );               
			// Form
				var form = '<div class="li-popup_wrapper"><div class="li-popup_wrapper_i"><a style="float:right;" href="javascript:LI.popup.remove();">Закрыть</a><b>'+title+'</b><div class="li-popup_wrapper_text"></div></div></div>';
				parent.innerHTML = form;
			// Shadow
				var shadow = document.createElement('div');
				shadow.className = 'li-popup_shadow';
				shadow.style.height = LiCi.pageHeight() + 'px';
				parent.appendChild( shadow );		
				// Blur
				LiCi.$_add(LiCi.$_('li-j_wrapper')[0], 'li-bl_blur');
			// Close events
				LiCi.eventAdd (shadow, "click", function () {
					LI.popup.remove();
				});
				var close = LiCi.$_('li-popup_close');
				if (close.length > 0) {
					LiCi.eventAdd (close[0], "click", function () {
						LiCi.$Node.Del( parent );
						return false;
					});					
				}
			// Insert boy if defined
				if (body) {
					LI.popup.insert(body);
				}
			// Wrapper offset if element defined
				if (e) {
					var offset = LiCi.offset.top(e);
					LiCi.$_('li-popup_wrapper_i')[0].style.marginTop = offset - 150 + 'px';
				}
		},
		insert : function(body) {
			LiCi.$_('li-popup_wrapper_text')[0].innerHTML = body;
		},
		remove : function() {
			LiCi.$Node.Del( LiCi.$_('li-popup')[0] );
			LiCi.$_del(LiCi.$_('li-j_wrapper')[0], 'li-bl_blur');
		}
	};

/* Top panel
----------------------------------------------- */
     /* -----------[ Properties ]----------- */    
          LI.topPanel = {
               auth : '<form  class="gl_Top-nav-user-info-lnk-itemChange-menu" action="http://www.liveinternet.ru/member.php" method="post" name="diary_login_form"><input type="hidden" name="action" value="login" /><fieldset><label>Логин</label><input type="text" name="username" tabindex="1" /></fieldset><fieldset><label>Пароль</label><input  type=password name="password" tabindex="2" /></fieldset><input value="Войти" type="submit" tabindex="3" /></form>',
               theme : '<ul class="gl_Top-opts-theme-menu"><li onclick="LI.topPanel.themeSelect(\'default\');"><a href="#">Стандартный</a></li><li onclick="LI.topPanel.themeSelect(\'author\');"><a href="#">Авторский</a></li><li onclick="LI.topPanel.themeSelect(\'my\');"><a href="#">Мой</a></li></ul><!--<b>Дополнительно</b><ul class="gl_Top-opts-theme-menu"><li onclick="LI.topPanel.avatarSwitch();"><a class="j-gl_Top-opts-theme-menu_avatar" href="#">Не загружать аватары</a></li></ul>-->'
          };         
     /* -----------[ Methods ]----------- */
          LI.topPanel.accountlist = function (j) {
               var users = '';
               for (i = 0; i<j.length; i++) {
                    users += '<li><a href="/login.php?userid='+j[i][1]+'&ref='+window.location+'">'+j[i][0]+'</a></li>';
               }
               return users;
          };
          LI.topPanel.users2form = function (e) {
               var id = e.id+'_menu';
               var elem = LiCi.$(id);
               elem.parentNode.removeChild(elem);
               //LI.menu.show(e, 'Сменить пользователя', LI.topPanel.auth);
               LiCi.$Set($(':gl_Top-nav-user-info-lnk-itemLogin_menu'), 'display', 'block');
          };
          LI.topPanel.search = function (e,diff,type) {
               var parent = e.parentNode;
               var wrapper = e.parentNode.parentNode;
              
               if (type=='open') {
                    wrapper.style.left = 0;
                    parent.style.width = LiCi.elemWidth(parent)+diff+'px';
                    e.style.width = LiCi.elemWidth(e)+diff+'px';
               } else {
                    wrapper.style.left = '60px';
                    parent.style.width = LiCi.elemWidth(parent)-diff+'px';
                    e.style.width = LiCi.elemWidth(e)-diff+'px';
               }
          };
          LI.topPanel.themeSelect = function (type) {
               LiCi.setCookie('ThemeSelect',type);
               document.location.reload();
          };
          LI.topPanel.avatarSwitch = function () {
          	console.debug(LiCi.$_('j-gl_Top-opts-theme-menu_avatar'));
          };
     /* -----------[ Events ]----------- */
     if (!LI.isPartner)
     {
          // LiCi.domReady (function () {
                    /* -[ User type ]- */
                         LiCi.$Set(LiCi.$(':gl_Top'),'visibility','visible');
                         if (auth) {
                              LiCi.$Set(LiCi.$(':gl_Top-navAuth'),'display','block');
                              LiCi.$Set(LiCi.$(':gl_Top-rand-stat'),'display','none');
                         } else {
                              LiCi.$Set(LiCi.$(':gl_Top-navNoauth'),'display','block');
                         }
                    
                    /* -[ Panel width ]- */                   
                         var e = LiCi.$(':gl_TopI');
                         var wind = LiCi.windowWidth();
                        
                        // @TODO 
                         if (wind>1200) {
	                     	LiCi.$Set(e,'width','1200px');
	                     	LiCi.$_add(LiCi.$(':gl_Body'),'gl_Width-full');
                         } else {
                         	LiCi.$Set(e,'width','980px');
                         	if (wind>1000) {
	                        	LiCi.$_add(LiCi.$(':gl_Body'),'gl_Width-half');	
                         	} else {
	                         	LiCi.$_add(LiCi.$(':gl_Body'),'gl_Width-small');	
                         	}
                         }
                         
                    /* -[ Username width ]- */
                         if (auth)
                         {
                              var u = LiCi.$(':gl_Top-nav-user-info-name');
                              if (LiCi.elemWidth(u) > 80) {
                                   if (wind > 1200) {
                                        LiCi.$Set(LiCi.$(':gl_Top-nav-user'), 'width', '350px');
                                   }
                                   else
                                   {
                                        LiCi.$Set(u, 'width', '80px');
                                        LiCi.$Set(u, 'height', '17px');
                                        LiCi.$Set(LiCi.$(':gl_Top-nav-user-info-name-long'), 'display', 'block');
                                        LiCi.$Set(LiCi.$(':gl_Top-nav-user-info-name-long'), 'left', LiCi.elemWidth(u) - 8 + 'px');
                                   }
                              }                     
                         }
                    /* -[ Im counter ]- */
                    	if (auth) {	
                    		var counter = LiCi.$(':gl_Topv2-nav-menu-item-lnkImCnt')
                    		if (counter) {
                    			if (counter.innerHTML == 0) {
                    				counter.style.display = 'none';
                    			}                    		
                    			if (counter.innerHTML > 0) {
                    				LiCi.$_add(LiCi.$_('gl_Topv2-nav-menu-item-lnkIm')[0], 'gl_Topv2-nav-menu-item-lnkImNew')
                    			}
                    		}
                    	}
               // });
          /* -[ Change user ]- */    
               LiCi.eventAdd (LiCi.$(':gl_Top-nav-user-info-lnk-itemChange'), "click", function () {
                    if (LI.topPanel.accounts.length > 0) {
                         cur = this;
                         LI.menu.show(this, 'Последние активные', '<ul class="gl_Top-opts-theme-menu">' + LI.topPanel.accountlist(LI.topPanel.accounts) + '</ul><div style="margin-top:5px;text-align:center;font-weight:bold;"><a href="javascript:LI.topPanel.users2form(cur);">Ввести имя</a> / <a href="/journals.php?s=&action1=login">Выйти</a></div>');
                    }
                    else {
                         //LI.menu.show(this, 'Сменить пользователя', LI.topPanel.auth);
                         LiCi.$Set($(':gl_Top-nav-user-info-lnk-itemLogin_menu'), 'display', 'block');
                    }
               });
               LiCi.eventAdd (LiCi.$(':gl_Top-navNoauth-change'), "click", function () {
                    //LI.menu.show(this,'Сменить пользователя',LI.topPanel.auth);
                    LiCi.$Set($(':gl_Top-nav-user-info-lnk-itemLogin_menu'), 'display', 'block');
               });
          /* -[ Change theme ]- */    
               LiCi.eventAdd (LiCi.$(':gl_Top-opts-theme'), "click", function () {
                    LI.menu.show(this,'Шаблон страниц',LI.topPanel.theme);
               });
          /* -[ Search form ]- */         
               LiCi.eventAdd (LiCi.$(':gl_Top-opts-srch-inp'), "focus", function () {
                    LI.topPanel.search(this,70,'open');
               });
               LiCi.eventAdd (LiCi.$(':gl_Top-opts-srch-inp'), "blur", function () {
                    LI.topPanel.search(this,70,'close');
               });
               LiCi.eventAdd (LiCi.$(':gl_Top-opts-srch-btn'), "click", function () {
                    this.parentNode.parentNode.submit();
               });
          /* -[ Support form ]- */   
          	   var support = LiCi.$(':gl_Top-opts-support');
          	   if (support) {
	               LiCi.eventAdd (support, "click", function () {

                       var gc_script = document.createElement('script');
                       gc_script.src = 'https://www.google.com/recaptcha/api.js?render=6Lfp--AZAAAAALm3e8BjlIobnh0UjHn-bay4oIao';
                       gc_script.async = false;
                       document.body.appendChild(gc_script);

                       setTimeout(function(){

                       grecaptcha.ready(function() {grecaptcha.execute("6Lfp--AZAAAAALm3e8BjlIobnh0UjHn-bay4oIao", {action: "send_abuse"}).then(function(token) {
						// Close events
                           // Parent
                           var parent = document.createElement('div');
                           parent.className = 'li-support';
                           document.body.appendChild( parent );
                           // Form

                           var form = '<div class="li-support_form"><form onsubmit="return false;" class="li-support_form_form"><b>Сообщение службе технической поддержки</b><fieldset><legend>Ваш e-mail для контактов</legend><input name="email" class="li-support_form_input" type="text" /></fieldset><fieldset><legend>Выберите категорию письма из списка</legend><select name="subj"><option value="Размещение рекламы">Размещение рекламы</option><option value="Предложение о сотрудничестве">Предложение о сотрудничестве</option><option value="Вопросы по сервисам дневников" selected="selected">Вопросы по сервисам дневников</option><option value="Вопросы по статистике сайтов (счетчикам)">Вопросы по статистике сайтов (счетчикам)</option><option value="Вопросы по сервису почты и прочим сервисам">Вопросы по сервису почты и прочим сервисам</option></select></fieldset><fieldset><legend>Текст сообщения</legend><textarea name="body"></textarea></fieldset><fieldset><a class="li-support_form_close" href="#">Закрыть</a><input type="submit" value="Отправить" /></fieldset><input type="hidden" name="g_token" id="g_token" value="" /></form></div>';
                           parent.innerHTML = form;

                           // Shadow
                           var shadow = document.createElement('div');
                           shadow.className = 'li-support_shadow';
                           shadow.style.height = LiCi.pageHeight() + 'px';
                           parent.appendChild( shadow );

                           setTimeout(function(){

                               LiCi.eventAdd (shadow, "click", function () {
                                   LiCi.$Node.Del( parent );
                               });
                               LiCi.eventAdd (LiCi.$_('li-support_form_close')[0], "click", function () {
                                   LiCi.$Node.Del( parent );
                                   return false;
                               });
                           }, 1000);

							LiCi.eventAdd (LiCi.$_('li-support_form')[0], "submit", function () {
								elements = LiCi.$_('li-support_form_form')[0].elements;
								if (elements['email'].value == '' || elements['body'].value == '') {
									alert('Не заполнены обязательные поля');
								} else {
									new Ajax.Request('/sendcontact2.php', {
									    method: 'post',
									    parameters: {
									    	ajax  : 1,
									        email : elements['email'].value,
									        subj  : elements['subj'].value,
									        body  : elements['body'].value,
                                            g_token: token
									    },                                    
									  onComplete:function(transport){
									  	LiCi.$Node.Del(LiCi.$_('li-support')[0]);
									  },
                                      onSuccess:function(data){
                                          LiCi.Notify.show('true','Спасибо, результат отправки:' + data['status']);
                                      }
									});
								}
							});
                    	});});



						return false;
                       }, 3000); });
          	   } 
          }    

/* Application panel
----------------------------------------------- */
     if (!LI.isPartner && 1 == 2) {
          /* -----------[ Properties ]----------- */
               LI.appPanel = {
                    smallHeight : 50,
                    delay : 500,
                    timer : 0,
                    transp : false,
                    topFull : function () {
                         return LiCi.windowHeight() - this.bigHeight;
                    },
                    topMin : function () {
                         return LiCi.windowHeight()/2 - this.smallHeight;
                    }
               };
               if (auth) {
                    LI.appPanel.bigStatus = LiCi.getOption(LiCi.$(':gl_Apps-full')).status;
                    LI.appPanel.smallStatus = LiCi.getOption(LiCi.$(':gl_Apps-min')).status;
                    LI.appPanel.bigStyle = LiCi.$(':gl_Apps-full').style;
                    LI.appPanel.smallStyle = LiCi.$(':gl_Apps-min').style;
                    LI.appPanel.bigHeight = LiCi.elemHeight(LiCi.$(':gl_Apps-full'));
               }
          /* -----------[ Methods ]----------- */    
               /* -[ First call ]- */
                    LI.appPanel.pos = function () {
                         var dig = LiCi.$_('gl_Apps-item-digitI',LiCi.$(':gl_Apps-full'));
                         for (var i=0,j=dig.length; i<j; i++)
                              if (dig[i].innerHTML == 0)
                                   dig[i].style.display = 'none';
                         this.bigStyle.top = this.topFull() + 'px';
                         this.smallStyle.top = this.topMin() + 'px';
                         if (this.bigStatus === 1)  this.bigStyle.visibility = 'visible';
                         else this.smallStyle.visibility = 'visible';
                    };
               /* -[ Show/hide panel ]- */    
                    LI.appPanel.view = function (stat1,stat2,obj1,obj2,act) {
                         stat1 = 0;
                         stat2 = 1;
                         obj1.visibility = 'hidden';
                         obj2.visibility = 'visible';
                         var url = '/show_app_panel.php';
                          var myAjax = new Ajax.Updater('', url, {method: 'get', parameters: 'cmd='+act});
                    };
               /* -[ Scroll ]- */    
                    LI.appPanel.scroll = function () {
                         /* -[ Scrolling ]- */
                              /* -[ Transparency ]- */
                                   if (this.transp == false) {
                                        if (LiCi.getBrowser.safari)
                                             LiCi.setOpacity(LiCi.$(':gl_Apps'),0.10);
                                        else
                                             LiCi.$Set($(':gl_Apps'),'display','none');
                                        this.transp = true;
                                   }
                                   clearTimeout(this.timer);
                                   this.timer = setTimeout(function(){
                                        if (LiCi.getBrowser.safari)
                                             LiCi.setOpacity(LiCi.$(':gl_Apps'),1);
                                        else
                                             LiCi.$Set($(':gl_Apps'),'display','block');
                                        LI.appPanel.transp = false;
                                   }, this.delay);
                                  
                              var offset = LiCi.offset.body();
                                   this.bigStyle.top = this.topFull() + offset + 'px';
                                   this.smallStyle.top = this.topMin() + offset + 'px';
                                  
                    };
          /* -----------[ Events ]----------- */
               if (auth)
               {
                    /* -[ Load ]- */
                         LiCi.domReady (function () {
                              LI.appPanel.pos();    
                         });
                    /* -[ Scroll ]- */    
                         LiCi.eventAdd (window, "scroll", function () {
                              LI.appPanel.scroll();
                         });
                         LiCi.eventAdd (window, "load", function () {
                         });
                    /* -[ Resize ]- */    
                         LiCi.eventAdd (window, "resize", function () {
                              LI.appPanel.scroll();
                         });
                    /* -[ Hide big ]- */    
                         LiCi.eventAdd (LiCi.$(':gl_Apps-minim'), "click", function () {
                              LI.appPanel.view(
                                   LI.appPanel.bigStatus,
                                   LI.appPanel.smallStatus,
                                   LI.appPanel.bigStyle,
                                   LI.appPanel.smallStyle,
                                   'hide'
                              );
                         });
                    /* -[ Hide small ]- */    
                         LiCi.eventAdd (LiCi.$(':gl_Apps-min-lnk'), "click", function () {
                              LI.appPanel.view(
                                   LI.appPanel.smallStatus,
                                   LI.appPanel.bigStatus,
                                   LI.appPanel.smallStyle,
                                   LI.appPanel.bigStyle,
                                   'show'
                              );
                         });
               }
          }
         

         
              
/* Blogs
----------------------------------------------- */
     LI.blogs = {};
    
     /* -----------[ Draft ]----------- */
     	LI.blogs.draftLinks = {
	     	clName : 'j-li_draftlink',
	     	/* -----------[ Init ]----------- */
				init : function() {
					links = LiCi.$_(this.clName);
					for ( itm in links ) {
						if (typeof(links[itm]) == 'object') {
							this._call(links[itm], links[itm].getAttribute('data-action'));
						}
					}
				},
			/* -----------[ Call action ]----------- */
				_call: function(e, action) {
					that = this;
					e.setAttribute('data-url', e.href);
					e.href = 'javascript:void(0)';
					if (action == 'post') {
						LiCi.eventAdd(e, "click", function(){
							that._action(this, 'Действительно опубликовать эту запись?');
						});
					} else if (action == 'delete') {
						LiCi.eventAdd(e, "click", function(){
							that._action(this, 'Действительно удалить эту запись?');
						});
					}
				},
			/* -----------[ Action ]----------- */
				_action: function(e, text) {
					if (confirm(text)) {
						window.location.href = e.getAttribute('data-url');
					};
				}
		};
		
     /* -----------[ Who likes ]----------- */
     	LI.blogs.whoLikes = {
	     	clName : 'j-li_wholikes',
	     	/* -----------[ Init ]----------- */
				init : function() {
					var that = this;							
					var links = LiCi.$_(this.clName);
					if (links.length > 0) {
						for (i = 0; i<links.length; i++) {
							LiCi.eventAdd (links[i], "click", function () {
								that._popup(this);
								that._request(this);
								return false;
							});
						}					
					}
				},
			/* -----------[ Popup ]----------- */
				_popup: function(e) {
					LI.popup.show('Кому понравилась запись', 'Идет загрузка...', e);
				},
			/* -----------[ Request ]----------- */
				_request: function(e) {
					var post =  e.getAttribute('data-post');
					new Ajax.Request('/journal_proc.php?action=wholikes', {
						method: 'get',
						parameters: {
							jpostid : post,
							need_json: 1
						},                                    
						onFailure: function(transport){
						},
						onComplete:function(transport){
							// Make template
							var result = '';
							var json = transport.responseText.evalJSON(true);
							if (json.length>0) {
								for(var i=0;i<json.length;i++) {
									result += '<li><a href="'+json[i]['url']+'"><img src="//i.li.ru/ma/'+json[i]['url']+'/.gif" /></a><a class="uname" style="background-image:url(//i.li.ru/images/'+json[i]['gender']+'2.gif);" href="'+json[i]['url']+'">'+json[i]['name']+'</a></li>';
								};
								// Show popup
								LI.popup.insert('<ul class="li-bl_wholikes_list">'+result+'</ul>');
							} else {
								LI.popup.insert('Похоже, пока что запись понравилась только Вам...');
							}
                       	}
                   });					
				}				
		};
		
	 /* -----------[ Calendar ]----------- */
	 	LI.blogs.calendar = {
		 	_clName : 'j-li_calendar',
		 	/* -----------[ Init ]----------- */
				init : function() {

					var that = this;
					var link = LiCi.$_(this._clName)[0];
					if (link) {
						LiCi.eventAdd (link, "click", function () {
							//that._widget();
							that._request(this);
							this.href = 'javascript:return false;';
						});							
					}

				},
			/* -----------[ Widget ]----------- */
				_widget: function(days, id) {

					var disabledDays = jQuery.map(days, function (value, key) { return key; });
					var input = jQuery('#j-li_calendar');
					
					jQuery.datepicker.regional['ru'] = {
	                	closeText: 'Закрыть',
	                	prevText: '&#x3c;Пред',
	                	nextText: 'След&#x3e;',
	                	currentText: 'Сегодня',
	                	monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
	                	monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн', 'Июл','Авг','Сен','Окт','Ноя','Дек'],
	                	dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
	                	dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
	                	dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
	                	weekHeader: 'Не',
	                	firstDay: 1,
	                	isRTL: false,
	                	showMonthAfterYear: false,
	                	yearSuffix: ''
	                };
	                jQuery.datepicker.setDefaults(jQuery.datepicker.regional['ru']);
					
					input.datepicker({
						changeMonth: true,
						changeYear: true,
					    dateFormat: 'yy-mm-dd',
					    beforeShowDay: function(date) {
					        var m = date.getMonth();
					        var d = date.getDate();
					        var y = date.getFullYear();
					        for (i = 0; i < disabledDays.length; i++) {
					            if (jQuery.inArray(y + '-' + (m+1) + '-' + d,disabledDays) != -1){
					                return [true, 'j-li_calendar_selected', ''];
					            }
					        }
					        return [false];
					    },
					    onSelect: function(dateText) {
					    	var explode = dateText.split('-');
					        window.location.href = 'http://www.liveinternet.ru/showjournal.php?journalid='+id+'&jday='+explode[2]+'&jyear='+explode[0]+'&jmonth='+explode[1];
					    }
					});
					input.datepicker('show');
					
				},
			/* -----------[ Request ]----------- */
				_request: function(e) {
					var id = e.getAttribute('data-id');
					var that = this;
					new Ajax.Request('/journal_proc.php?action=calendar_json', {
							method: 'get',
							parameters: {
								journalid: id
							},                                    
							onFailure: function(transport){
							},
							onComplete:function(transport){
								var json = transport.responseText.evalJSON(true);
								that._widget(json, id);
	                       	}
	                 });				
				}
	 	};
	 	
	 /* -----------[ Tasklist ]----------- */
	 	LI.blogs.tasklist = {
		 	_clName : 'j-li_tasklist',
		 	/* -----------[ Init ]----------- */
				init : function() {

					var that = this;
					var lists = LiCi.$_(this._clName);
					if (lists.length > 0) {
						for (i=0; lists.length>i; i++) {
							//var items = LiCi.$Node.Child.getFirsts(lists[i]);
							var items = LiCi.$Node.Child.getAll(lists[i]);
							if (items.length > 0) {
								for (j=0; items.length>j; j++) {
									if (items[j] != undefined && items[j].tagName == 'INPUT') {
										LiCi.eventAdd (items[j], "click", function () {
											that.action(this);
										});
									}
								}
							}
						}
					}

				},
			/* -----------[ Event action ]----------- */
				action : function(el) {
				
					var that = this;
					var parent = el.parentNode;
					var none = 'li-bl_tasklist_none';
					var line = 'li-bl_tasklist_through';
					
					if (bbuserid == curj) 
					{
						if (parent.className == line) {
							var status = 0;
							LiCi.$_rename(line, none, parent);
						} else if (parent.className == none) {
							var status = 1;
							LiCi.$_rename(none, line, parent);
						}
						
						new Ajax.Request('/journal_proc.php?action=token-json', {
							method: 'get',
							onComplete:function(transport){
								that.request(status, el, transport.responseText);
		                   	}
		                 });	
					} 
					else 
					{
						LiCi.Notify.show('true', 'Нельзя менять чужие тудушки');
					}											
				}, 
			/* -----------[ Send request ]----------- */
				request : function(status, el, token) {	
					var name = el.getAttribute('name');
					new Ajax.Request('/journal_proc.php', {
						method: 'post',
						parameters: {
							action: 'change_chb_state',
							journalid: curj,
							chb_state: status,
							chb_name: name,
							tok: token
						},                                    
						onFailure: function(transport){
						},
						onComplete:function(transport){
	                   	}
	                 });
				}				
	 	};
		
     
     /* -----------[ Add to friend ]----------- */
		LI.blogs.addFriend = {};
		/* -[ Initialize ]- */
			LI.blogs.addFriend.init = function() {
				if (curj!=userid && typeof is_friend != 'undefined') {
					if (is_friend==1) {
						this.insertlink('remove');
					} else {
						this.insertlink('add');
					}
				}
			};
		/* -[ Insert link ]- */	
			LI.blogs.addFriend.insertlink = function(type) {
				// Select target
					var blog_friend = LiCi.$(':blg_SidebarTofriend');
					if (blog_friend) {
						var target = blog_friend;
					// @TODO Remove on production
						target.innerHTML = '';
					// Action type
						if (type=='remove') {
							var string = 'Из друзей';
							var classname = 'li-icons_Man-del';
							this.method = function() { 
								LI.blogs.addFriend.remove();
							};
						} else {
							var string = 'В друзья';
							var classname = 'li-icons_Man-add';
							this.method = function(){
								LI.blogs.addFriend.add();
							};
						}					
					// Insert link
						target.innerHTML = '<a class="li-icons '+classname+' j-li_add2friend" href="#">'+string+'</a>';	
					// Attach menu event
						LiCi.eventAdd (LiCi.$_('j-li_add2friend')[0], "click", function () {
							LI.blogs.addFriend.method();
							return false;
						});				
				}
			};
		/* -[ Add (show menu) event ]- */
			LI.blogs.addFriend.add = function() {
				// Groups request
					new Ajax.Request('/journal_proc.php', {
						method: 'get',
						parameters: {
							action : 'my_friend_groups'
						},                                    
						onComplete:function(transport){
							// Make template
								var json = transport.responseText.evalJSON(true);
								var groups = '';
								for(var i=0;i<json.length;i++) {
									groups += '<li><a class="li-add2friend_groups_link" rel='+json[i]['id']+' href="#">'+json[i]['name']+'</a></li>'
		                    	}						
		                    	var tpl = '<div class="li-add2friend_groups">';
		                    		tpl += '<div class="li-add2friend_groups_type groups active" rel="existsgroup"><div class="inside">';
		                    			tpl += '<strong>Добавить в существующую группу</strong>';
			                    		tpl += '<ul>'+groups+'<li><a class="li-add2friend_groups_link checked" rel="0" href="#">Вне групп</a></li></ul><div style="clear:both;"></div>';
			                    	tpl += '</div></div>';
			                    	tpl += '<div class="li-add2friend_groups_type settings inactive" rel="newgroup"><div class="inside">';
			                    		tpl += '<strong>Персональные настройки подписки</strong>';
			                    		tpl += '<p><label><input type="checkbox" name="recvpost" checked="checked" class="li-add2friend_groups_option"  /> Получать новые сообщения</label></p>';
			                    		tpl += '<p><label><input type="checkbox" name="recvquote" checked="checked" class="li-add2friend_groups_option" /> Получать новые цитаты</label></p>';
			                    		tpl += '<p><label><input type="checkbox" name="recvfoto" checked="checked" class="li-add2friend_groups_option" /> Получать новые фотографии</label></p>';
			                    		tpl += '<p><label><input type="checkbox" name="sendmb" checked="checked" class="li-add2friend_groups_option" /> Написать в микроблоге</label></p>';
			                    	tpl += '</div></div>';
			                    	tpl += '<div class="button">';
		                    			tpl += '<input class="li-add2friend_groups_btn" type="submit" value="Добавить в друзья" />';
		                    			tpl += '<button class="li-add2friend_groups_reject">Отказаться от добавления</button>';
		                    		tpl += '</div>';
		                    		tpl += '<a style="display:none;" class="li-add2friend_groups_doesntwork" href="/member2.php?action=addlist&userlist=buddy&userid='+curj+'&userownid='+bbuserid+'">Нажмите, если процесс добавления не срабатывает</a>';
		                    	tpl += '</div>';
		                    // Show popup
								LI.popup.show('Подтверждение добавления', tpl);
							// Add events
								var links = LiCi.$_('li-add2friend_groups_link');
								for (i=0;links.length>i;i++) {
									LiCi.eventAdd (links[i], "click", function () {
										for (k=0;links.length>k;k++) {
											LiCi.$_del(links[k], 'checked');
										}
										LiCi.$_add(this, 'checked');
										return false;
									});																	
								};
								var types = LiCi.$_('li-add2friend_groups_type');
								for (i=0;types.length>i;i++) {
									LiCi.eventAdd (types[i], "click", function () {
										for (k=0;types.length>k;k++) {
											LiCi.$_del(types[k], 'active');
											LiCi.$_add(types[k], 'inactive');
										}
										LiCi.$_del(this, 'inactive');
										LiCi.$_add(this, 'active');
									});
								};
								LiCi.eventAdd (LiCi.$_('li-add2friend_groups_btn')[0], "click", function () {
									this.value = 'Идет процесс добавления...';
									this.disabled = true;
									LiCi.$_('li-add2friend_groups_reject')[0].style.display = 'none';
									LiCi.$_('li-add2friend_groups_doesntwork')[0].style.display = 'block';
									LI.blogs.addFriend.send();
								});
								LiCi.eventAdd (LiCi.$_('li-add2friend_groups_reject')[0], "click", function () {
									LI.popup.remove();
								});
					   	}
					  });									
			};
		/* -[ Remove event ]- */
			LI.blogs.addFriend.remove = function() {
				// Send request
					new Ajax.Request('/member2.php?action=removelist&ajax_request=1', {
						method: 'post',
						parameters: {
							userlist  : 'buddy',
							userid    : curj,
							userownid : bbuserid,
							tok       : usertoken
						},                                    
						onFailure: function(transport){
						},
						onComplete:function(transport){               
							var json = transport.responseText.evalJSON(true);
							if (json.status == 'OK') {
								LI.blogs.addFriend.insertlink('add');
								LiCi.Notify.show('true',json.user_message);
							}
                       	}
                   });				
			};
		/* -[ Send form method ]- */
			LI.blogs.addFriend.send = function() {
				// Get friend group
					var links = LiCi.$_('li-add2friend_groups_link');
					for (i=0;links.length>i;i++) {
						 if (LiCi.Strings.reg('checked', links[i].className)) {
						 	var friendgroup = links[i].getAttribute('rel');
						 }
					};
				// Get special options
					var options = {};
					var options_list = LiCi.$_('li-add2friend_groups_option');
					for (i=0;options_list.length>i;i++) {
						var item = options_list[i];
						var name = item.getAttribute('name')
						if (item.checked)
							options[name] = 1
						else
							options[name] = 0
					};
				// Select action type
					var types = LiCi.$_('li-add2friend_groups_type');
					for (i=0;types.length>i;i++) {
						if (LiCi.Strings.reg('active', types[i].className)) {
							var listtype = types[i].getAttribute('rel');
						}
					};		
				// Send request
					new Ajax.Request('/member2.php?action=addlist&ajax_request=1', {
						method: 'post',
						parameters: {
							userlist       : 'buddy',
							userid         : curj,
							userownid      : bbuserid,
							tok            : usertoken,
							groupid        : friendgroup,
							recvpost       : options['recvpost'],
							recvquote      : options['recvquote'],
							recvfoto       : options['recvfoto'],
							sendmb         : options['sendmb'],
							addlist_action : listtype
						},                                    
						onFailure: function(transport){
							LiCi.Notify.show('false', 'Произошла ошибка, воспользуйтесь <a href="/member2.php?action=addlist&userlist=buddy&userid='+curj+'&userownid='+bbuserid+'">ручным добавлением</a>...');
						},
						onComplete:function(transport){               
							var json = transport.responseText.evalJSON(true);
							if (json.status == 'OK') {
								LI.popup.remove();
								LI.blogs.addFriend.insertlink('remove');
								LiCi.Notify.show('true',json.user_message);
							}
                       	}
                   });
			};			
			
				
     /* -----------[ Add to friend v 1 ]----------- */
          /* -[ Events ]- */
               LiCi.domReady (function () {

                         var e = LiCi.$(':blg_SidebarTofriend');
                         if (e)
                         {
                              if (curj!=userid) {
                                   if (is_friend==1) {
                                        var string = 'Из друзей';
                                        var action = 'removelist';
                                   } else {
                                        var string = 'В друзья';
                                        var action = 'addlist';
                                   }
                                   e.innerHTML = '<a id=":blg_SidebarTofriendLink" class="GlIco2Friend" href="/member2.php?action='+action+'&userlist=buddy&userid='+curj+'&userownid='+userid+'">'+string+'</a>';
                              }
                         }
    
               });    
              
     /* -----------[ Fast comment ]----------- */
          /* -[ Settings ]- */
               LI.blogs.fastcom = {
                    fastClass : 'blo-fastcom'
               };
          /* -[ Init ]- */
               LI.blogs.fastcom.init = function () {
                    this.formClass = this.fastClass+'_form';
                    this.baseClass = this.fastClass+'_base';
                    this.initClass = this.baseClass+'_init';
                    this.countClass = this.baseClass+'_count';
                    this.namesClass = this.baseClass+'_names';
                    this.counts = LiCi.$_(this.countClass);
                    this.event ();
               };
          /* -[ Event ]- */
               LI.blogs.fastcom.event = function()
               {
                    //if (typeof(curusername)=='undefined' || curusername=="" && bbuserid != 42258) return;
                    if (typeof(curuser)=='undefined' || curuser=="" && bbuserid != 42258) return;
                   
                    /* -[ Get element array ]- */
                         var posts = LiCi.$_(this.baseClass);
                         var links = LiCi.$_(this.initClass);
                         var names = LiCi.$_(this.namesClass);
                    /* -[ If elements defined ]- */
                         if (posts && links && names.length > 0)
                         {
                              for (i=0;links.length>i;i++)
                              {
                                        /* -[ Insert click link ]- */
                                             var fastcom = document.createElement('a');
                                             fastcom.className = this.baseClass+'_click';
                                             fastcom.href = 'javascript:void(0);';
                                             links[i].parentNode.insertBefore( fastcom, links[i].parentNode.firstChild );
                                             fastcom.innerHTML = 'Ответить';
                                        /* -[ Event ]- */
                                             var link = links[i].href;
                                             var uname = names[i].innerHTML;

                                             LiCi.eventAdd (fastcom, "click", function (i,posts,link,uname) {
                                                  return function () {
                                                       /* -[ Reload lightbox ]- */
                                                            LI.bigpic.resizer.coordinator();
                                                       /* -[ Load libs ]- */
                                                            LiCi.require('/spell/spell.js');
                                                            LiCi.require('/4Ek/JS/diary/trans.js');
                                                       /* -[ Show form ]- */                    
                                                            LI.blogs.fastcom.show (i,posts,link,uname);
                                                  }
                                             }(i,posts,link,uname));    
                              }
                         }
               };                        
          /* -[ Show form method ]- */    
               LI.blogs.fastcom.show = function (x,arr,lnk,uname) {
              
                    /* -[ If exemplar not defined now – create form ]- */
                         var formId = this.formClass+x;
                         if (!LiCi.$(formId))
                         {
                              /* -[ Create layer ]- */
                                   var layer = document.createElement('form');
                                   layer.className = this.formClass;
                                   layer.id = formId;
                                   arr[x].appendChild(layer);
                              /* -[ Form template ]- */
                                   if (globals.avatarChange.status == 1) {
                                        var avaMargin = '160px';
                                        var avaChange = '' +
                                        '<div class="li-avachange_init li-avachange_init_Float">'+
                                             "<div style='background-image:url("+globals.avatarChange.url+");' digit="+formId+" src="+formId+" class=li-avachange_init_sel onclick='LI.avachange.layer(this,\"comment\");'></div>"+
                                             "<input type=hidden name=ac id=li-avachange_init_ac_"+formId+" />"+
                                             "<span class='li-avachange_init_lnk'>Выбрать аватар</span>"+                                                  
                                        '</div>';
                                   } else {
                                        var avaChange = '';
                                        var avaMargin = 0;
                                   }
                                   var tpl = ''+
                                        '<div class="'+this.formClass+'_login">'+
                                             '<h2>Быстрый комментарий</h2>'+
                                             '<input type="radio" name="addsource" value="asuser" id="'+this.formClass+'_asuser'+x+'" checked="checked" /> <label for="'+this.formClass+'_asuser'+x+'">от имени '+username+'</label>'+
                                             '<input type="radio" name="addsource" value="asanon" id="'+this.formClass+'_asanon'+x+'" /> <label for="'+this.formClass+'_asanon'+x+'">анонимно</label>'+
                                        '</div>'+                                  
                                        '<div>'+
                                             avaChange +
                                             '<div style="margin-left:'+avaMargin+';">'+
                                                  '<p style="height:38px;">'+
                                                       '<b>Заголовок</b> (не обязательно)'+
                                                       '<span><input tabindex="1" name="headerofpost" type="text" /></span>'+
                                                  '</p>'+
                                                  '<p>'+
                                                       '<b>Текст комментария</b>'+
                                                       '<span><textarea tabindex="2" name="message" id="'+this.formClass+'_area'+x+'"></textarea></span>'+
                                                  '</p>'+
                                                  '<span class="'+this.formClass+'_opts"><input type="checkbox" checked="checked" name="parseurl" id="'+this.formClass+'_parseurl'+x+'" /> <label for="'+this.formClass+'_parseurl'+x+'">Перевод URL в ссылки</label> <input type="checkbox" checked="checked" name="commentsubscribe" id="'+this.formClass+'_commentsubscribe'+x+'" /> <label for="'+this.formClass+'_commentsubscribe'+x+'">Подписка на комментарии</label>'+
                                                  "<input id=BlInnrcomDoLinkC"+this.formClass+" type=checkbox name=dopostlink value=1 tabindex=7 /><label for=BlInnrcomDoLinkC"+this.formClass+">Перенести в мой дневник</label>"+
                                                      "<input id=BlInnrcomDoLikeC"+this.formClass+" type=checkbox name=dolike value=1 tabindex=8 /><label for=BlInnrcomDoLinkC"+this.formClass+"><font color=green><b>Понравилось!</b></font></label>"+'</span>'+
                                                  '<span class="'+this.formClass+'_lnk" id="'+this.formClass+'_events'+x+'"><a>Обратиться</a> <a>Смайлы</a> <a>Транслит</a> <a>Орфография</a></span>'+
                                                  '<p class="'+this.formClass+'_send"><input tabindex="3" class="'+this.formClass+'_btn" name="submit" value="Отправить" type="button" /></p>'+
                                             '</div>'+
                                        '</div>';              
                                   layer.innerHTML = tpl;
                                   var form = LiCi.$(formId);
                                   form['message'].focus();
                              /* -[ Events ]- */
                                   /* -[ Send for key ]- */
                                        form.onkeypress = function (e) {
                                             var evtobj = window.event? event : e;
                                             LiCi.keys.ctrlenter (evtobj,this, function () {
                                                  LI.blogs.fastcom.submit (form,lnk,x);
                                             });                                            
                                        }
                                   /* -[ Send for button ]- */
                                        LiCi.eventAdd (form['submit'], "click", function () {
                                             LI.blogs.fastcom.submit (form,lnk,x);
                                        });                                                                                                
                                   /* -[ Other events ]- */    
                                        var events = LiCi.$Node.Child.getAll(LiCi.$(this.formClass+'_events'+x))
                                        LiCi.eventAdd (events[0], "click", function () {
                                             form['message'].value=form['message'].value+"[user="+uname+"], ";
                                        });
                                        LiCi.eventAdd (events[1], "click", function () {
                                             window.open('/smilies.php?formid='+LI.blogs.fastcom.formClass+'_area'+x,'_blank','left=100,top=100,width=450,height=450,location=0,menubar=0,resizable=0,scrollbars=1,status=0,toolbar=0');
                                        });                   
                                        LiCi.eventAdd (events[2], "click", function () {
                                             with(form['headerofpost']) { value=translit2win(value);}
                                             with(form['message']) { value=translit2win(value);}
                                        });                   
                                        LiCi.eventAdd (events[3], "click", function () {
                                             LI.speller(form['message']);
                                        });
                         }
                    /* -[ If exemplar defined – form show ]- */
                         else
                         {
                              LiCi.$Set(LiCi.$(formId),'display','block');
                         }
               };
          /* -[ Send form method ]- */
               LI.blogs.fastcom.submit = function (f,str,i) {
              
                    /* -[ Reload lightbox ]- */
                         LI.bigpic.resizer.coordinator();
              
                    var journalid = LiCi.Strings.urlparse(str,'journalid');
                    var jpostid = LiCi.Strings.urlparse(str,'jpostid');
                    var jcommid = LiCi.Strings.urlparse(str,'jcommid');
                   
                    if (LiCi.$(this.formClass+'_asuser'+i).checked) {
                         var comuserid= bbuserid;
                         var addsource = 'asuser';
                    }
                    if (LiCi.$(this.formClass+'_asanon'+i).checked) {
                         var comuserid= -1;
                         var addsource = 'asanon';
                    }

                    if (f['parseurl'].checked)
                         var parseurl = 1;
                    else
                         var parseurl = 0;

                    if (f['commentsubscribe'].checked)
                         var commentsubscribe = 1;
                    else
                         var commentsubscribe = 0;
                   
                    if (f['dopostlink'].checked)
                         var dopostlink = 1;
                    else
                         var dopostlink = 0;


                    if (f['dolike'].checked)
                         var dolike = 1;
                    else
                         var dolike = 0;                                  
                   
                    if(typeof(f['ac']) == 'undefined')    
                      var ac_value=0;
                    else
                      var ac_value=f['ac'].value;

                    var message = f['message'].value;
                    if (message == '' || message == ' ') {
                         alert ('Тело комментария не может быть пустым');
                    }
                    else
                    {
                         /* -[ Disable button ]- */
                              f['submit'].disabled = true;
                         /* -[ Disable button ]- */    
                              LiCi.Notify.show('wait','Идет отправка комментария');
                         /* -[ Send request ]- */
                              new Ajax.Request('/journal_addcomment.php?action=newcomment&doajax=1', {
                                     method: 'post',
                                     parameters: {
                                          isutf: true,
                                          journalid: journalid,
                                          jpostid: jpostid,
                                          jcommid: jcommid,
                                          message: message,
                                          headerofpost : f['headerofpost'].value,
                                          parseurl : parseurl,
                                          commentsubscribe : commentsubscribe,
                                          comuserid : comuserid,
                                        dopostlink: dopostlink,
                                        dolike: dolike,
                                          addsource : addsource,
                                          ac : ac_value
                                     },                                    
                                   onFailure: function(transport){
                                             LiCi.Notify.kill(1);
                                             LiCi.Notify.show('false','Отправка не удалась...');
                                             LiCi.Notify.kill(3600*5);
                                   },
                                   onComplete:function(transport){
         
                                       result=unescape(transport.responseText);
                                             retval=result.substr(0,2);
                                             content=result.substr(3);
                                       if (retval=='OK')  //пост прошел, дальше html
                                             {
                                        /* -[ Show success notify ]- */
                                             LiCi.Notify.kill(100);
                                             LiCi.Notify.show('true','Комментарий добавлен');
                                             LiCi.Notify.kill(3600);
                                        /* -[ Update count ]- */
                                             if (LI.blogs.fastcom.counts.length>0) {
                                                  var cnt = LI.blogs.fastcom.counts[i].innerHTML;
                                                  LI.blogs.fastcom.counts[i].innerHTML = parseInt(cnt)+1;
                                             }
                                        /* -[ Enable button ]- */
                                               f['submit'].disabled = false;
                                          /* -[ Hide form ]- */
                                               LiCi.$Set(f,'display','none');
                                          /* -[ Clear fields ]- */
                                             f['headerofpost'].value = f['message'].value = '';

                                             }else{
                                             LiCi.Notify.kill(1);
                                             LiCi.Notify.show('false',content);
                                             LiCi.Notify.kill(3600*10);
                                        /* -[ Enable button ]- */
                                               f['submit'].disabled = false;
                                       }
               
                                   }
                              });
                    }
               }               

     /* -----------[ Read more ]----------- */
          /* -[ Settings ]- */
               LI.blogs.readmore = {
                    fastClass : 'blo-readmore'
               };
          /* -[ Init ]- */
          		LI.blogs.readmore.init = function () {
	          	var links = LiCi.$_(this.fastClass+'_link');
	          	var templates = LiCi.$_(this.fastClass+'_template');
	          	/* -[ If elements are defined ]- */
	           		if (links.length > 0) {
		           		for (i=0;links.length>i;i++) {
		           			links[i].href = 'javascript:return;';
		           			LiCi.eventAdd (links[i], "click", function () {
			           			LI.blogs.readmore.event(this);
		           			});	           
		           			if ($(links[i]).hasClassName('blo-readmore_video')) {
			           			LiCi.eventAdd (links[i], "mouseover", function () {
				           			LI.blogs.readmore.event(this);
			           			});			           			
		           			}
		           		};
		           	}
               }; 
          /* -[ Event ]- */       
          	LI.blogs.readmore.event = function (link) {
          		// Show hidden block
          			var parent = $(link).up('.blo-readmore');
          			var template = $(parent).select('script.blo-readmore_template');
          			$(link).replace(template[0].innerHTML);
          	};        
          	
          	/* -----------[ Sticky sidebar banner ]----------- */
          		/* -[ Settings ]- */
          			LI.blogs.sidebanner = {
	          			initClass   : 'j-li_sidebar-last',
	          			bannerClass : 'j-li_sidebar-banner'
	          		};
	          	/* -[ Init ]- */
	          		LI.blogs.sidebanner.init = function() {
		          		var trigger = LiCi.$_(this.initClass);
	          			if (trigger.length > 0) {
	          				this.trigger = trigger[0];
	          				this.triggerLeft = LiCi.offset.left(this.trigger);
	          				this.banner = LiCi.$_(this.bannerClass)[0];
		          			this.event();
	          			}
	          		};
	          	/* -[ Event ]- */
	          		LI.blogs.sidebanner.event = function() {
	          			var that = this;
		          		LiCi.eventAdd (window, "scroll", function () {
		          			//that.positioning();
		          		});
	          		};
	          	/* -[ Positioning ]- */
	          		LI.blogs.sidebanner.positioning = function() {
	      				if (LiCi.offset.body() > LiCi.offset.top(this.trigger)) {
	      					var left = - (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
	          				this.banner.style.position = 'fixed';
	          				this.banner.style.top = '30px';
	          				if (left <= 0) this.banner.style.left = this.triggerLeft + left + 'px';
	          			} else {
	          				if (this.banner.style.position == 'fixed') {
		          				this.banner.style.position = 'static';
		          				this.banner.style.top = 0;
		          			}
	          			}
	          		};
	          		
	        /* -----------[ Visislbe area counter ]----------- */
          		/* -[ Settings ]- */
          			LI.blogs.vcounter = {
	          			initClass   : 'j-li_vcounter',
	          			insertClass : 'j-li_vcounter__insert'
	          		};
	          	/* -[ Init ]- */
	          		LI.blogs.vcounter.init = function() {
				  		var trigger = LiCi.$_(this.initClass);
	          			if (trigger.length > 0) {
	          				this.event(trigger[0]);
	          			}
	          		};
	          	/* -[ Event ]- */
	          		LI.blogs.vcounter.event = function(trigger) {
	          			var that = this;
				  		LiCi.eventAdd (window, "scroll", function () {
				  			if (that.isVisible(trigger)) {
				  				that.insert(trigger);
				  			}
					  	});
	          		};
	          	/* -[ Insert couner ]- */
			  		LI.blogs.vcounter.insert = function(trigger) {
						if (document.getElementById(this.insertClass) == null) {
							var counter = document.createElement('div');
							counter.id = this.insertClass;
							counter.innerHTML = '<img src="//counter.yadro.ru/hit;libanner800_new?r'+
				escape(document.referrer)+((typeof(screen)=='undefined')?'':
				';s'+screen.width+'*'+screen.height+'*'+(screen.colorDepth?
				screen.colorDepth:screen.pixelDepth))+';u'+escape(document.URL)+
				';hru;'+Math.random()+
				'" width=1 height=1 alt="">';
							trigger.appendChild(counter);
						}
	          		};
	          	/* -[ Receive top trigger position ]- */
			  		LI.blogs.vcounter.top = function(element) {
				  		var offset = 0;
				  		while(element) {
					  		offset += element["offsetTop"];
					  		element = element.offsetParent;
					  	}
					  	return offset;
	          		};
	          	/* -[ Check visibility ]- */
			  		LI.blogs.vcounter.isVisible = function(elt) {
				  		if (!elt) {
					  		return false;
					  	}
					  	var posTop = this.top(elt);
					  	var posBottom = posTop + elt.offsetHeight;
					  	var visibleTop = (document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop);
					  	var visibleBottom = visibleTop + window.innerHeight;
					  	return ((posBottom >= visibleTop) && (posTop <= visibleBottom));
	          		};
	          		
         
/* Yandex speller
----------------------------------------------- */
     LI.speller = function (e) {         
          var speller = new Speller({ url:"/spell", lang:"ru", options:Speller.IGNORE_URLS });
          speller.check([e]);    
     };    
    

/* Friend search
----------------------------------------------- */
     LI.fsearch = {
          inpCl : 'gl_Top-opts-srch-inp',
          lstCl : 'bl-fsrch_list',
          items : 10,
          result : '',
          load : false,
          inarray : ''
     };
          /* -----------[ Methods ]----------- */    
               /* -[ Init ]- */
                    LI.fsearch.init = function () {
                         if (!LI.isPartner) {
                              var input = LiCi.$_(this.inpCl)[0];
                              input.disabled = false;
                              LiCi.eventAdd (input, "click", function () {
                                   LI.fsearch.transform();
                              });
                              LiCi.eventAdd (input, "keyup", function () {
                                   LI.fsearch.update(this);
                              });    
                         }                                            
                    };
               /* -[ Check contains ]- */
                    LI.fsearch.contains = function (a) {
                         var o = {};
                         for(var i=0;i<a.length;i++) {
                              o[a[i]]='';
                         }
                         return o;
                    }         
               /* -[ Remove node ]- */    
                    LI.fsearch.close = function () {
                         e = LiCi.$_(this.lstCl)[0];
                         if (e)
                              e.parentNode.removeChild(e);
                    };         
               /* -[ Get and transform json ]- */
                    LI.fsearch.transform = function () {
                         /* -[ Get data ]- */
                              if (this.load == false) {
                                   new Ajax.Request('/journal_proc.php?action=friends_json&n=10000&userid='+bbuserid, {
                                           asynchronous:false,
                                           onComplete:function(request) {
                                             /* -[ Return result ]- */
                                                  var json = request.responseText.evalJSON(true);
                                                 
                                                  var letters = [];
                                                  for ( itm in json ) {
                                                       var key = json[itm].name.toLowerCase().charAt(0);
                                                       if (key in LI.fsearch.contains(letters) == false) {
                                                            letters.push(key);
                                                       }
                                                  }         
                                                           
                                                  var resort = {}
                                                  for (a = 0; a<letters.length; a++) {
                                                       resort[letters[a]] = [];
                                                       for ( itm in json ) {
                                                            if (letters[a] == json[itm].name.toLowerCase().charAt(0)) {
                                                                 resort[letters[a]].push(json[itm])
                                                            }
                                                       }
                                                  }                   
                                            
                                             LI.fsearch.result = resort;
                                             LI.fsearch.load = true;
                                           }
                                   });
                              }
                    };    
               /* -[ Update ]- */    
                    LI.fsearch.update = function (input) {
                         str = input.value;
                         if (str.length > 0) {
                              var list = this.research(str);
                              if (list == undefined) list = [];
                              this.createnode(input);
                              this.insert (list,LiCi.$_(this.lstCl+'_grp_Frn')[0],str);
                         } else {
                              this.close();
                         }                   
                    };
               /* -[ Return search results ]- */                                            
                    LI.fsearch.research = function (str) {
                         if (str.length > 0) {
                        
                              if (str.length == 1) {
                                   var tags = this.result[str.toLowerCase()];
                                   if ( tags != undefined ) {
                                        this.inarray = tags;
                                   }         
                              } else {
                                   var tags = [];
                                   for (i = 0; i<this.inarray.length; i++) {
                                        if (this.inarray[i].name.search(new RegExp(str, 'ig')) == 0) {
                                             tags.push(this.inarray[i]);
                                        }
                                   }
                              }    
                             
                              return tags;                                       
                         }                        
                    };                        
               /* -[ Create node ]- */
                    LI.fsearch.createnode = function(e,list) {
                         /* -[ If already not defindex ]- */
                              if (LiCi.$_(this.lstCl).length == 0) {
                                   /* -[ Parent coordinates ]- */
                                        var top = LiCi.offset.top(e) + LiCi.elemHeight(e) + 12;
                                        var left = LiCi.offset.left(e) - LiCi.elemWidth(e) - 100;
                                   /* -[ Create node ]- */
                                        var layer = document.createElement('div');
                                        layer.className = this.lstCl;
                                        layer.style.top = top+'px';
                                        layer.style.left = left+'px';
                                        LiCi.$(':gl_Body').appendChild(layer);                                  
                                   /* -[ Node template ]- */
                                        var tpl = '<div class="'+this.lstCl+'_i">'+
                                                  '<div class="'+this.lstCl+'_hdr">'+
                                                       '<span>'+
                                                            '<a class="bl-fsrch_lnk" href="#">Все результаты</a> <a class="bl-fsrch_lnk" href="#">Расширенный поиск</a>'+
                                                       '</span>'+
                                                       '<strong>Поиск в списках друзей</strong>'+
                                                  '</div>'+
                                                  '<div class="'+this.lstCl+'_grp">'+
                                                       //'<strong>Друзья</strong>'+
                                                       '<div class="'+this.lstCl+'_grp_Frn">'+
                                                       '</div>'+
                                                  '</div>'+
                                                  '<span class="'+this.lstCl+'_close"><a class="bl-fsrch_lnk" href="#"><b>x</b> закрыть</a></span>'+
                                             '</div>';
                                   /* -[ Insert tpl to node ]- */
                                        layer.innerHTML = tpl;                                  
                                   }
                         LiCi.eventAdd (LiCi.$_(this.lstCl+'_close')[0], "click", function () {
                              LI.fsearch.close();
                         });    
                    };                                       
               /* -[ Insert items ]- */    
                    LI.fsearch.insert = function (obj,e,str) {
                         var sorted = obj;
                         if (sorted.length > 0) {                        
                              var list = '';
                              for (var j = 0; j < sorted.length; j++) {
                                   var itm = sorted[j];
                                  
                                   if (str) {
                                        var name = LiCi.Strings.rpls(str, '<b>'+str+'</b>', itm.name)
                                   } else  {
                                        var name = itm.name;
                                   }

                                   if (itm.gender=='r') {
                                        var gender = 'rss.gif'
                                   } else {
                                        var gender = itm.gender+'2.gif';
                                   }                                  
                                  
                                   list += '<p>'+
                                             '<a href="'+itm.domain+'profile" class="bl-fsrch_list_grp_itm_ava" style="background:#FFF url(//i.li.ru/ma/'+itm.domain+'/.gif) no-repeat 50% 50%;" href="#">Аватар '+itm.name+'</a>'+
                                                  '<a href="'+itm.domain+'profile" class="bl-fsrch_list_grp_name"><em style="background:url//www.liveinternet.ru/images/'+gender+') no-repeat 0 50%;">'+name+'</em></a>'+
                                                  '<a href="/im/letter/create/'+itm.id+'" class="bl-fsrch_list_grp_pm bl-fsrch_lnk">личное сообщение</a>'+
                                             '<span class="bl-fsrch_list_grp_last">обновлен '+itm.lastpost+'</span>'+
                                        '</p>';                             
                              }
                              e.innerHTML = list;
                         } else {
                              e.innerHTML = 'Ничего не найдено, уточните запрос';
                         }
                    };
                        

/* Avatar changer
----------------------------------------------- */
     LI.avachange =  {
          lnkClass : 'li-avachange',
          recipient : ''
     }
     /* -----------[ Init method ]----------- */    
          LI.avachange.init = function( parent ) {
               var e = LiCi.$_( parent )[0]
               if ( e ) {
                this.event( e );
               }
          }
     /* -----------[ Create event ]----------- */    
          LI.avachange.event = function( e ) {              
               LiCi.eventAdd ( e, 'mouseover', function () {
                    /* -[ Parent props ]- */
                         var lnkClass = LI.avachange.lnkClass;
                    /* -[ Wrapper defined? ]- */    
                         if ( !LiCi.$_( lnkClass )[0] ) {
                              /* -[ Get current avatar ]- */
                                   var avatar = LiCi.$Node.Child.getFirst( e );
                              /* -[ Create link ]- */
                                   var wrapper = document.createElement('div');
                                   var top = LiCi.offset.top ( avatar ) + 'px';
                                   var left = LiCi.offset.left ( avatar ) + 'px';
                                   wrapper.className = lnkClass;
                                   wrapper.style.width = LiCi.elemWidth( avatar ) + 'px';
                                   wrapper.style.height = LiCi.elemHeight( avatar ) + 'px';
                                   wrapper.style.top = top;
                                   wrapper.style.left = left;
                                   LiCi.$(':gl_Body').appendChild(wrapper);
                              /* -[ Remove link ]- */
                                   LiCi.eventAdd ( wrapper, 'mouseout', function () {                   
                                        LiCi.$Node.Del( this );
                                   });                                       
                              /* -[ Create avatars layer ]- */    
                                   LiCi.eventAdd ( wrapper, 'click', function () {                                       
                                        LI.avachange.layer( wrapper );
                                   });
                         }
               });                   
          }
     /* -----------[ Create layer ]----------- */
          LI.avachange.layer = function( wrapper ) {
         
               if (arguments.length > 1) {
                    var type = 'comment'
                    this.recipient = wrapper;
                    var master = bbuserid;
               } else {
                    var type = 'panel'
                    var master = curj;
               }              
         
               var layClass = LI.avachange.lnkClass+'_layer';
               if ( !LiCi.$_( layClass )[0] ) {
                    var layer = document.createElement('div');
                    layer.className = layClass;
                    layer.style.top = LiCi.offset.top(wrapper) + 'px';
                    layer.style.left = LiCi.offset.left(wrapper) + 'px';
                    LiCi.$(':gl_Body').appendChild(layer);
                   
                    if (bbuserid == curj)
                         var setup = '<a class="'+layClass+'_change" href="/journal_photo.php">Управление аватарами</a>';
                    else
                         var setup = '';
                    layer.innerHTML = '<div class="'+layClass+'_pics"><div class="'+layClass+'_pics_I"><h1>Все аватары пользователя</h1><span class="'+layClass+'_pics_load"></span><span title="Закрыть" class="'+layClass+'_pics_close">Закрыть</span>'+setup+'<div class="'+layClass+'_pics_items" style="display:none;"></div><div class="'+layClass+'_pics_chng"></div></div></div>';
              
               /* -[ Ajax ]- */
                    new Ajax.Request('/journal_proc.php?action=avatar_json&userid='+master, {
                       asynchronous:false,
                       onComplete:function(request) {
                              /* -[ Return result ]- */
                                   var result = request.responseText.evalJSON(true);
                                   var htmlItems = LiCi.$_(layClass+'_pics_items')[0];                                  

                                   if (result.length == 0) {
	                                   htmlItems.innerHTML = "Пока что пользователь не загрузил ни одного аватара :'(";
                                   } else {
	                                   for (itm in result) {                                                                          
	                                        if (type == 'panel') {
	                                             htmlItems.innerHTML += '<span class="'+layClass+'_pics_itm"><a href="#" style="background-image:url('+result[itm].url+');">'+result[itm].title+'</a>'+result[itm].title+'</span>';                                       
	                                        } else {
	                                             htmlItems.innerHTML += '<span class="'+layClass+'_pics_itm"><a aId='+result[itm].id+' id="'+layClass+'_pics_itm_'+itm+'" href="javascript:LI.avachange.comments.set(\''+layClass+'_pics_itm_'+itm+'\');" style="background-image:url('+result[itm].url+');">'+result[itm].title+'</a>'+result[itm].title+'</span>';                                       
	                                        }
	                                   }	                                   
                                   }
                                   
                                   //htmlItems.appear();
                                   htmlItems.style.display = 'block';
                                   LiCi.$Node.Del(LiCi.$_(layClass+'_pics_load')[0]);
                              /* -[ Event for close button ]- */    
                                   LiCi.eventAdd ( LiCi.$_(layClass+'_pics_close')[0], 'click', function () {
                                        LI.avachange.close(layer);
                                   });
                       }
                    });              
                   
               }         
         
          };
     /* -----------[ Close popup ]----------- */    
          LI.avachange.close = function(e) {
               //e.fade({ duration: 0.5 });
               e.style.display = 'none';
               setTimeout(function(){LiCi.$Node.Del(e)}, 1*1000);              
          };
     /* -----------[ Change in comment ]----------- */    
          LI.avachange.comments = {}         
          LI.avachange.comments.set = function (id) {
               /* -[ Get src ]- */
                    var e = LiCi.$(id);
               /* -[ Set comment background ]- */
                    var recipient = LI.avachange.recipient;
                    recipient.style.backgroundImage = e.style.backgroundImage;
               /* -[ Insert hidden field ]- */    
                    LiCi.$('li-avachange_init_ac_'+recipient.getAttribute('digit')).value = e.getAttribute('aId');
               /* -[ Close popup ]- */
                    LI.avachange.close(LiCi.$_(LI.avachange.lnkClass+'_layer')[0]);
          };

         
/* Fast tags
----------------------------------------------- */         
     LI.fasttags = {
          clName : 'li-suggest',
          offset : 0,
          last : ''
     }    
     /* -----------[ Init ]----------- */
          LI.fasttags.init = function() {              
              
               var e = LiCi.$_( this.clName )[0];
               if ( e ) {
              
                    e.style.position = 'relative';
                    LI.fasttags.json.resort();
                                                  
               /* -[ Get parent input ]- */
                    LI.fasttags.input = LiCi.$Node.Child.getAll( e )[0];
                    var realName = this.input.name;
                    var realId = this.input.id;
                    var realTop = LiCi.offset.top(this.input);
                    var realLeft = LiCi.offset.left(this.input);
                    var realValue = this.input.value;
                    //e.style.height = LiCi.elemHeight(this.input) + 'px';
                    LiCi.$Node.Del( this.input );
               /* -[ Create clone input ]- */         
                    var clone = document.createElement('div');
                    clone.className = this.clName+'_parent';
                    clone.innerHTML = '<form onsubmit="return false"><input value="'+realValue+'" class="'+this.clName+'_clone" type="text" /></form>'
                    e.appendChild(clone);
                    this.input = LiCi.$_(this.clName+'_clone')[0];
               /* -[ Create hidden input ]- */    
                    var hidden = document.createElement('input');
                    hidden.type  = 'hidden';
                    hidden.name = realName;
                    hidden.id = realId;
                    hidden.className = this.clName+'_hidden';
                    e.appendChild(hidden);
                    LI.fasttags.hidden = hidden;
               /* -[ Get pure values ]- */
                    var tags = this.input.value.split(',');
               /* -[ Create layer ]- */    
                    var layer = document.createElement('div');
                    layer.className = this.clName+'_layer';
                    this.input.parentNode.appendChild(layer);
                    LI.fasttags.layer = layer;
                    if (this.input.value.length > 0) {                                  
                         /* -[ Insert htmled ]- */
                              for (i = 0; i<tags.length; i++) {
                                   this.htmlise( tags[i] );
                              }                        
                    }                                  
                   
                    LI.fasttags.keys.init( this.input );                        
               }              
          }              
     /* -----------[ Tags reformat ]----------- */
          LI.fasttags.json = {
               result : '',
               inarray : ''
          }
          /* -----------[ Check contains ]----------- */
               LI.fasttags.json.contains = function (a) {
                    var o = {};
                    for(var i=0;i<a.length;i++) {
                         o[a[i]]='';
                    }
                    return o;
               }              
          /* -----------[ Resort ]----------- */                   
               LI.fasttags.json.resort = function () {
                    new Ajax.Request('/journal_proc.php?action=tags_json&userid='+curj+'&n=100500=', {
                         asynchronous:false,
                         onComplete:function(request) {
                              json = request.responseText.evalJSON(true);
                         }
                    });                                                           
                    if (typeof(json) != 'undefined') {
                         var letters = [];
                         for ( itm in json ) {
                              var key = json[itm].name.charAt(0);
                              if (key in this.contains(letters) == false) {
                                   letters.push(key);
                              }
                         }                   
                         var resort = {}
                         for (a = 0; a<letters.length; a++) {
                              resort[letters[a]] = [];
                              for ( itm in json ) {
                                   if (letters[a] == json[itm].name.charAt(0)) {
                                        resort[letters[a]].push(json[itm].name)
                                   }
                              }
                         }                   
                         this.result = resort;                                       
                    }
               }
          /* -----------[ Find ]----------- */                   
               LI.fasttags.json.find = function(tag) {
                    if (tag.length == 1) {
                         var tags = this.result[tag];
                         if ( tags != undefined ) {
                              this.inarray = tags;
                              return tags;
                         }                   
                    } else {
                         var tags = [];
                         for (i = 0; i<this.inarray.length; i++) {
                              if (this.inarray[i].search(tag) == 0) {
                                   tags.push(this.inarray[i]);
                              }
                         }
                         return tags;
                    }
               }    
     /* -----------[ Key processing ]----------- */         
          LI.fasttags.keys = {
          }    
          /* -[ Keydown init ]- */
               LI.fasttags.keys.init = function( input ) {    
                    input.onkeyup = function( event )
                    {
                         var tag = this.value;
                        
                         /* -[ Special keys ]- */
                              if (!event) event = window.event;
                              var k = event.keyCode;
                        
                              if (k in LI.fasttags.json.contains([8,13,38,40])) {                                  
                                        LI.fasttags.keys.any( event.keyCode, tag );
                              }
                         /* -[ Any keys ]- */
                              else
                              {
                                   LI.fasttags.auto( tag );
                                                                               
                                   /* -[ Autoconvert ]- */    
                                        var explode = tag.split(',');
                                        if (tag.match(',') && tag.length > 1) {
                                             /* -[ Ctrl + V ]- */    
                                                  if (explode.length > 0) {
                                                       for (i = 0; i<explode.length; i++) {
                                                            LI.fasttags.htmlise( explode[i] );
                                                       }
                                             /* -[ Just input ]- */         
                                                  } else {
                                                       LI.fasttags.htmlise( tag );
                                                  }
                                        }                             
                              }                                                                                    
                    }              
               }
          /* -[ Select key ]- */
               LI.fasttags.keys.any = function ( key, tag ) {
              
                    if ( key == 8 ) {
                         this.backspace(tag);
                         LI.fasttags.auto(tag);
                    }              
                    if ( key == 13 ) {
                         this.enter( tag );
                    }              
                    if ( key == 38 || key == 40 ) {
                         this.arrow( key, tag )
                    }
               };
          /* -[ Backspace ]- */              
               LI.fasttags.keys.backspace = function ( tag ) {
                    if (tag.length == 0 && LI.fasttags.last.length == 0) {
                         var htmlised = LiCi.$_(LI.fasttags.clName+'_item_close');
                         var htmlisedCnt = htmlised.length;
                         if (htmlisedCnt>0){
                              LI.fasttags.remove(htmlised[htmlisedCnt-1]);
                         }                             
                    } else {
                         LI.fasttags.autoDel();
                    }
               }              
          /* -[ Enter ]- */
               LI.fasttags.keys.enter = function ( tag ) {                   
                    var list = LiCi.$_( LI.fasttags.clName+'_list' )[0];
                    if (list) {
                         var active = LiCi.$_( 'active', list );
                         /* -[ Select menu element ]- */
                              if (active.length > 0) {
                                   LI.fasttags.htmlise( LiCi.$Node.Child.getFirst(active[0]).getAttribute('data-tag') )
                         /* -[ Parse input ]- */                                  
                              } else {
                                   if (tag != ',' && tag != '' && tag != ' ') {
                                        LI.fasttags.htmlise( tag );
                                   }
                              }
                    }                   
               }
          /* -[ Arrow ]- */    
               LI.fasttags.keys.arrow = function ( key, tag ) {                   
                    var list = LiCi.$Node.Child.getFirsts( LiCi.$_( LI.fasttags.clName+'_list' )[0] );                   
                    /* -[ Active number ]- */
                         var activeIndex = -1;
                         for (l = 0; l<list.length; l++) {
                              if (list[l]) {
                                   if (list[l].className == 'active') {
                                        activeIndex = l;    
                                        LiCi.$_del(list[l],'active');
                                   }                                                 
                              }
                         }
                    /* -[ Navigation ]- */
                         if (key == 38) { activeIndex = activeIndex-1; } else if (key == 40) { activeIndex = activeIndex+1; }         
                         if (activeIndex-1 < 0) { activeIndex = 0; } else if (activeIndex+1 > list.length-1) { activeIndex = list.length-1; }                              
                    /* -[ Set active ]- */
                         if (list[activeIndex]) { list[activeIndex].className = 'active'; }                   
               }
     /* -----------[ Last convert ]----------- */              
          LI.fasttags.lastconvert = function() {
               var tag = LiCi.$_(this.clName+'_clone')[0].value;
               if (tag.length > 0) this.htmlise(tag);
          }
     /* -----------[ Htmlise ]----------- */
          LI.fasttags.htmlise = function( tag ) {                             
               if (tag.length > 0) {
                    /* -[ Remove , ]- */
                         tag = LiCi.Strings.rpls( ',', '', tag );
                    /* -[ Create element ]- */
                         var clName = this.clName+'_item';
                         var htmlTag = document.createElement('span');
                         htmlTag.className = clName;
                         htmlTag.innerHTML = '<i>'+tag+'</i><b class="'+this.clName+'_item_close'+'" onclick="LI.fasttags.remove(this);">x</b>';
                         this.layer.appendChild(htmlTag);
                    /* -[ Clean visible input ]- */    
                         this.input.value = '';
                    /* -[ Update invisible input ]- */    
                         if (this.hidden.value) {
                              var tags = this.hidden.value.split(',');
                              tags.push(tag);
                              this.hidden.value = tags.join();                             
                         } else {
                              this.hidden.value = tag;
                         }    
                    /* -[ Add left padding ]- */
                         /*
                         var offset = 0;
                         var childs = LiCi.$Node.Child.getFirsts( this.layer );
                         for (j = 0; j<childs.length; j++) {
                              offset = 2 + offset + LiCi.elemWidth( childs[j] );
                         }
                         this.offset = offset;
                         this.input.style.paddingLeft = this.offset + 'px';
                         */
                    /* -[ Remove menu if have ]- */    
                         this.autoDel();              
                         this.last = '';
               }
          }
     /* -----------[ Remove ]----------- */
          LI.fasttags.remove = function ( e ) {
               /* -[ Change padding ]- */
                    //this.offset = this.offset - 2 - LiCi.elemWidth(e.parentNode);
                    this.input.style.paddingLeft = this.offset + 'px';
               /* -[ Remove html ]- */
                    LiCi.$Node.Del( e.parentNode );
               /* -[ Remove input ]- */
                    var tags = this.hidden.value.split(',');
                    for (i = 0; i<tags.length; i++) {
                         if ( tags[i] == LiCi.$Node.Child.getAll(e.parentNode)[0].innerHTML ) {
                              tags.splice(i,1);
                         }
                    }
                    this.hidden.value = tags.join();
               /* -[ Remove menu if have ]- */    
                    this.autoDel();                                  
          }
     /* -----------[ Delete menu ]----------- */    
          LI.fasttags.autoDel = function() {
               var menu = LiCi.$_( this.clName+'_list' )[0];
               if (menu) {
                    LiCi.$Node.Del( menu );
               }                        
          }
     /* -----------[ Autocomplete ]----------- */    
          LI.fasttags.auto = function( tag ) {
                this.last = tag;
                if (tag.length > 0)
                {
                    /* -[ Get request ]- */
                         var result = LI.fasttags.json.find(tag);
                    /* -[ Create list ]- */
                         if (!LiCi.$_( this.clName+'_list' )[0]) {
                              var parent = this.input;
                              var list = document.createElement('div');
                              list.className = this.clName+'_list';
                              list.style.left = this.offset + 'px';
                              list.style.top = LiCi.elemHeight(parent) + 'px';
                              parent.parentNode.appendChild(list);
                         }                        
                    /* -[ Update list ]- */
                         if (result) {
                              var items = '';
                              var list = LiCi.$_( this.clName+'_list' )[0];
                              list.innerHTML = '';
                              for (i = 0; i<result.length; i++) {                                  
                                   var item = document.createElement('li');
                                   item.innerHTML = '<a data-tag="'+result[i]+'" href="javascript:LI.fasttags.htmlise(\''+result[i]+'\')">'+result[i]+'</a>';
                                   list.appendChild(item);
                                   //items += '<li><a href="javascript:LI.fasttags.htmlise(\''+result[i]+'\')">'+result[i]+'</a></li>';
                              }
                              //LiCi.$_( this.clName+'_list' )[0].innerHTML = items;                   
                              //var item = document.createElement('ul');
                              //item.innerHTML = items;
                              //LiCi.$_( this.clName+'_list' )[0].appendChild(item);
                         } else {
                              LI.fasttags.autoDel();
                         }
               }
          }
         
/* Like post
----------------------------------------------- */
     LI.likethis = {
          clName : 'blLi_ppan'
     }
          /* -----------[ Init ]----------- */    
               LI.likethis.init = function( id ) {
                    var e = LiCi.$_( this.clName )[0]
                    if ( e ) {
                         /* -[ Attach event ]- */
                              if (id != undefined) {
                                   var button = LiCi.$( this.clName+'-like_'+id );
                              } else {
                                   var button = LiCi.$_( this.clName+'-like' )[0];
                              }
                              /* -[ Like ]- */
                                   if (LiCi.Strings.reg(this.clName+'-like_Unliked',button.className)) {
                                        button.onclick = function() {
                                             LI.likethis.like ( this );
                                        };
                                   }
                              /* -[ Unlike ]- */
                                   else {
                                        button.onclick = function() {
                                             LI.likethis.unlike ( this );
                                        };                                  
                                   }
                    }
               }
          /* -----------[ Counter ]----------- */    
               LI.likethis.counter = {
               }
                    /* -[ Get ]- */
                         LI.likethis.counter.get = function () {
                              var item = LiCi.$_( LI.likethis.clName+'-like' )[0].getElementsByTagName('b')[0];
                              if (item) return item;
                              else return false;         
                         }
                         LI.likethis.counter.digit = function () {
                              return parseFloat( this.get().innerHTML );
                         }                             
                    /* -[ Set ]- */
                         LI.likethis.counter.set = function ( type ) {
                              if ( type == 'plus' ) {
                                   /* -[ Update ]- */
                                        if (this.get()) {
                                             this.get().innerHTML = this.digit() + 1;
                                        }
                                   /* -[ Create ]- */    
                                        else {
                                             var digit = document.createElement('b');
                                             digit.innerHTML = 1;
                                             LiCi.$_( LI.likethis.clName+'-like' )[0].getElementsByTagName('span')[0].appendChild(digit);                              
                                        }
                              }
                              if ( type == 'minus' ) {
                                   /* -[ Update ]- */
                                        if ( this.digit() > 1 ) {
                                             this.get().innerHTML = this.digit() - 1;
                                        }
                                   /* -[ Remove ]- */    
                                        else {
                                             LiCi.$Node.Del( this.get() );
                                        }                   
                              }                   
                         }
          /* -----------[ Event ]----------- */
               /* -[ Base ]- */
                    LI.likethis.event = function( e, str, digit, srch, rpls, met ) {
                        
                         var link = LiCi.$Node.Child.getAll( e )[1];
                         var href = link.href;
                        
                         link.href = 'javascript:void(0)';
                         LI.likethis.counter.set(digit);
                                            
                         new Ajax.Request( href+'&ajax=1' , {
                              method: 'post',
                              onSuccess : function () {
                                   link.innerHTML = str;
                                   link.href = LiCi.Strings.rpls(srch, rpls, href);
                                   e.onclick = met;
                                }                   
                           });                          
                           
                       return false;
                    }
               /* -[ Like ]- */
                    LI.likethis.like = function( e ) {
                         LI.likethis.event(e, 'Отменить', 'plus', 'like', 'unlike', function(){
                              LI.likethis.unlike( e );
                         });
                    }
               /* -[ Unlike ]- */
                    LI.likethis.unlike = function( e ) {
                         LI.likethis.event(e, 'Понравилось', 'minus', 'unlike', 'like',  function(){
                              LI.likethis.like( e );
                         });
                    }              
                   
/* Pic resize
----------------------------------------------- */         
     LI.bigpic = {
          clName : 'li-bigpic',
          tags : []
     }         
     /* -----------[ Init ]----------- */
          LI.bigpic.init = function() {
               /* -[ Content area ]- */
                    var area = LiCi.$('CON');
                    if (area) {
                         var areaTags = area.getElementsByTagName('*');
                         for (j = 0; j<areaTags.length; j++) {
                              
                              if (areaTags[j].hasAttribute('bigpic')) {
                                   var tagType = 'img';
                              }
                              else if ( areaTags[j].hasAttribute('rel') && areaTags[j].getAttribute('rel') == 'li-bigpic') {
                                   var tagType = 'href';
                              }
                              else {
                                   var tagType = 'any';
                              }                              
                              
                              if (tagType == 'img' || tagType == 'href') {
                                   this.tags.push({
                                        element : areaTags[j],
                                        type : tagType
                                   });
                              }                        
                         }                   
                    }
               /* -[ New pics ]- */    
                    if (this.tags.length > 0) {
                         for (i = 0; i<this.tags.length; i++) {
                              this.resizer.load( this.tags[i] );
                         }
                         this.backgrounder( this.tags[0] );
                    }              
          }
     /* -----------[ Resize icon ]----------- */    
          LI.bigpic.resizer = {}
               // Per image insert
                    LI.bigpic.resizer.load = function( obj ) {    
                         var e = obj.element
                                                 
                         // Old type                   
                              if (obj.type == 'img') {
                                  
                                   var clName = LI.bigpic.clName + '_resizer';
                                   if ( !LiCi.$_( clName )[0] ) {
                                        var resizer = document.createElement('div');
                                        resizer.className = clName;
                                        document.body.appendChild( resizer );
                                   }
                                  
                                   e.parentNode.style.position = 'static';
                                   var pic = e;
                                  
                                   var clck = document.createElement('a');
                                   clck.style.width = LiCi.elemWidth( pic ) + 'px';
                                   clck.style.height = LiCi.elemHeight( pic ) + 'px';
                                   clck.style.top = LiCi.offset.top( pic ) + 'px';
                                   clck.style.left = LiCi.offset.left( pic ) + 'px';                                  
                                   clck.className = LI.bigpic.clName + '_clck';                                                                
                                   clck.title = e.alt;
                                  
                                   LiCi.$_( clName )[0].appendChild( clck );                                  
                                  
                         // New type         
                              } else if (obj.type == 'href') {                        
                                                           
                                   e.style.position = 'relative';
                                   e.style.display = 'inline-block';
                                   e.setAttribute('onclick', 'return false');
                                   var pic = LiCi.$Node.Child.getFirst(e);
                                  
                                   var clck = document.createElement('span');
                                   clck.style.width = LiCi.elemWidth( pic ) + 'px';
                                   clck.style.height = LiCi.elemHeight( pic ) + 'px';
                                   clck.className = LI.bigpic.clName + '_clck';
                                   clck.title = pic.alt;
                                                                     
                                   if (pic.align == 'left') e.style.float = 'left'
                                   else if (pic.align == 'right') e.style.float = 'right'
                                  
                                   e.appendChild( clck );                                  
                              }
                                                 
                         //clck.title = 'Нажмите, чтобы увидеть полноразмерное изображение';
                         LiCi.eventAdd (clck, "click", function () {
                              LI.bigpic.popup( obj );
                         });                        
                    };
                   
                   
               // Change coordinates
                    LI.bigpic.resizer.coordinator = function() {
                         var resizer = LiCi.$_( LI.bigpic.clName + '_resizer' )[0];
                              if (resizer) {
                              resizer.style.display = 'none';
                              setTimeout(function(){                             
                                   resizer.innerHTML = '';                             
                                   var pics =     LI.bigpic.tags;
                                   for (i = 0; i<pics.length; i++) {
                                        LI.bigpic.resizer.load( pics[i] );         
                                   }                        
                                   resizer.style.display = 'block';
                              }, 1.5*1000);                        
                         }
                    };    
     /* -----------[ Backgrounder ]----------- */         
          LI.bigpic.backgrounder = function( obj ) {
               var clName = this.clName+'_backgrounder';
               var parent = LiCi.$_( clName )[0];
               if( !parent ) {
                    parent = document.createElement('div');
                    parent.style.display = 'none';
                    parent.className = clName;
                    document.body.appendChild( parent );
               }
               if ( obj.type == 'img' ) {
                    parent.innerHTML = '<img src="'+ obj.element.getAttribute( 'bigpic' ) +'" />';
               } else if ( obj.type == 'href' ) {
                    parent.innerHTML = '<img src="'+ obj.element.getAttribute( 'href' ) +'" />';
               }
          };
     /* -----------[ Show popup ]----------- */
          LI.bigpic.popup = function( e ) {
               // Disable flash
                    var flash = document.body.getElementsByTagName("object");
                    for (f = 0; f<flash.length; f++) {
                         flash[f].style.visibility = 'hidden';
                    }                                            
               /* -[ Window ]- */
                    var parent = document.createElement('div');
                    parent.className = this.clName;
                    document.body.appendChild( parent );
               /* -[ Shadow ]- */
                    var shadow = document.createElement('div');
                    shadow.className = this.clName + '_shadow';
                    shadow.style.height = LiCi.pageHeight() + 'px';
                    parent.appendChild( shadow );
               /* -[ Close events ]- */
                    /* -[ Element ]- */
                         LiCi.eventAdd ( shadow, "click", function () {
                              LI.bigpic.close();
                         });
                         shadow.title = 'Закрыть окно';
               /* -[ Wrapper ]- */    
                    var wrapper = document.createElement('div');
                    wrapper.className = this.clName + '_wrapper';
                    wrapper.style.top = LiCi.offset.body() + 10 +'px';
                    wrapper.style.left = (LiCi.pageWidth() - 950) / 2 + 'px';
                    parent.appendChild( wrapper );
                   
                    wrapper.innerHTML = '<div class="'+this.clName+'_wrapper_inner"><div class="'+this.clName+'_wrapper_nav"></div><div class="'+this.clName+'_wrapper_pic"></div><div class="'+this.clName+'_wrapper_desc"></div><em onclick="LI.bigpic.close();" title="Закрыть окно">x</em></div>';                   
               /* -[ Pucker ]- */                        
                    LI.bigpic.pucker( e );
          }
     /* -----------[ Image ]----------- */    
          LI.bigpic.image = function( obj ) {
               if ( obj.type == 'img' ) {
                    LiCi.$_( this.clName+'_wrapper_pic' )[0].innerHTML = '<img class="'+this.clName+'_pic" src="'+obj.element.getAttribute( 'bigpic' )+'" />';              
               } else if ( obj.type == 'href' ) {
                    LiCi.$_( this.clName+'_wrapper_pic' )[0].innerHTML = '<img class="'+this.clName+'_pic" src="'+obj.element.href+'" />';
               }
          }
     /* -----------[ Navigation ]----------- */
          LI.bigpic.nav = function( e ) {
               /* -[ Show navigation ]- */
                    var nav = '';
                    var prev = '';
                    var next = '';
                    var index = this.tags.indexOf( e );
                    if (index != 0) {
                         prev = this.tags[index-1];
                         nav += '<span class="'+this.clName+'_wrapper_pager '+this.clName+'_wrapper_pager_Left" title="Предыдушая">&larr; + Ctrl </span>';
                    }
                    if (index+1 != this.tags.length) {
                         next = this.tags[index+1];
                         nav += '<span class="'+this.clName+'_wrapper_pager '+this.clName+'_wrapper_pager_Right" title="Следующая">Ctrl + &rarr;</span>';
                    }
                    LiCi.$_( this.clName+'_wrapper_nav' )[0].innerHTML = nav;
               /* -[ Call backgrounder ]- */    
                    this.backgrounder( next );                   
               /* -[ Attach mouse events ]- */
                    var left = LiCi.$_( this.clName+'_wrapper_pager_Left' )[0];
                    if (left) {
                         LiCi.eventAdd ( left, "click", function () {
                              LI.bigpic.pucker( prev );
                         });                                       
                    }
                    var right = LiCi.$_( this.clName+'_wrapper_pager_Right' )[0];
                    if (right) {
                         LiCi.eventAdd ( right, "click", function () {
                              LI.bigpic.pucker( next );
                         });                   
                    }
               /* -[ Attach key events ]- */    
                    document.onkeydown = function( e )
                    {                   
                                       
                         if (!e) e = window.event;
                         var k = e.keyCode;
                        
                         if (k == 27) LI.bigpic.close();                        
                        
                         if (e.ctrlKey) {
                              if (k == 37) LI.bigpic.pucker( prev );
                              if (k == 39) LI.bigpic.pucker( next );
                         }                                                 
                    }
          }
     /* -----------[ Description ]----------- */
          LI.bigpic.desc = function( obj ) {
               if ( obj.type == 'img' ) var e = obj.element;
               else if ( obj.type == 'href' ) var e = LiCi.$Node.Child.getFirst(obj.element);
               if (e.getAttribute( 'alt' )) LiCi.$_( this.clName+'_wrapper_desc' )[0].innerHTML = '<p>'+e.getAttribute( 'alt' )+'</p>';
          }
     /* -----------[ Pucker ]----------- */    
          LI.bigpic.pucker = function( e ) {
               this.image( e );
               this.nav( e );
               this.desc( e );
          }
     /* -----------[ Close popup ]----------- */    
          LI.bigpic.close = function() {
               var parent = LiCi.$_( this.clName )[0];
               LiCi.$Node.Del( parent );
          // Enable flash
               var flash = document.body.getElementsByTagName("object");
               for (f = 0; f<flash.length; f++) {
                    flash[f].style.visibility = 'visible';
               }
          }                   
         
         
/* Social comments
----------------------------------------------- */
     LI.socialComm = {
          clName : 'li-social',
          first : false,
          current : ''
     };
     /* -----------[ Cleaner ]----------- */
          LI.socialComm.cleaner = function( e, obj ) {
               /* -[ Clean area ]- */
                    e.innerHTML = '';    
               /* -[ Null selected ]- */    
                    var clName = this.clName+'_tabs_active';
                    var selected = LiCi.$_(clName);
                    if (selected.length > 0) {
                         LiCi.$_del(selected[0], clName);                             
                    }
               /* -[ Check tab as selected ]- */
                    LiCi.$_add( LiCi.$_(this.clName+'_tabs_'+obj.key)[0], clName );
          };
     /* -----------[ Comments engines ]----------- */
          LI.socialComm.engines = {
               facebook : {
                    status : true,
                    name : 'FaceBook',
                    key : 'fb',
                    load : function( area ) {
                         area.innerHTML = '<div id="fb-root"><fb:comments href='+location.href+'></fb:comments></div>';
                         FB.XFBML.parse(area);
                    }
               },
               vkontakte : {
                    status : true,
                    name : 'Вконтакте',
                    key : 'vk',
                    load : function( area ) {
                         area.innerHTML = '<div id="vk_comments"></div>';
                         VK.init({apiId: 2374362, onlyWidgets: true});
                         VK.Widgets.Comments("vk_comments", {limit: 20, width:'auto', attach: "*"});    
                    }
               },
               twitter : {
                    status : false,
                    name : 'Twitter',
                    key : 'twi',
                    load : function( area ) {
                        twttr.anywhere(function (T) {
                             /* -[ Create twit area ]- */
                                   if (!T.isConnected()) {
                                       area.innerHTML = '<div id="tconn" style="float:left; margin:-3px 10px 0 0;"></div>Чтобы писать комментарии нужно авторизоваться';
                                        T("#tconn").connectButton({
                                             authComplete: function( area ) {
                                                    LI.socialComm.engines.twitter.load( area );
                                               }
                                        });
                                   } else {
                                        var user = T.currentUser;
                                       area.innerHTML = '<div id="tbox" style="padding:10px;background:#EEE;border:#DDD 1px solid;border-width:1px 0 1px 0;"><div style="width:100px;float:left; margin-top:6px;">Вы <a href="http://www.twitter.com/'+user.screenName+'">@'+user.screenName+'</a><img style="display:block; margin-top:12px;" src="'+user.profileImageUrl+'" /></div></div><div id="tcomm"></div>';
                                       /* -[ Insert comment area ]- */
                                            T("#tbox").tweetBox({
                                                  height: 100,
                                                  width: 690,
                                                  label : 'Ваш комментарий',
                                                  defaultContent: "@liveinternet_ru "+ location.href
                                            });
                                   }
                              /* -[ Previous posted twits ]- */
                                   var comm = document.createElement('div');
                                   comm.innerHTML = '<iframe src="http://www.liveinternet.ru/ReActive/static/twitter/" frameborder="0" width="100%" height="auto" style="margin-top:10px;padding:10px;"></iframe>';
                                   area.appendChild(comm);                            
                             });
                    }
               }
          };
     /* -----------[ Init ]----------- */    
          LI.socialComm.init = function() {
               var parent = LiCi.$_(this.clName)[0];
               if (parent) {              
                    parent.innerHTML = '<div class='+this.clName+'_hdr><strong>Внешние комментарии</strong><ul class='+this.clName+'_tabs></ul></div><div class='+this.clName+'_area></div>';
                    var obj = this.engines;
                    for ( i in obj ) {
                         var e = obj[i];
                         if (e.status) {
                              /* -[ Create tabs ]- */
                                   /* -[ Insert HTML ]- */
                                        var li = document.createElement('li');
                                        li.className = this.clName+'_tabs_'+e.key;
                                        li.innerHTML = e.name;
                                        LiCi.$_(this.clName+'_tabs')[0].appendChild(li);
                                   /* -[ Add event ]- */
                                        LiCi.eventAdd (li, "click", function (e) {
                                             return function () {
                                                  /* -[ Already selected? ]- */
                                                       if (LI.socialComm.current != e.name) {
                                                            /* -[ Select ]- */
                                                                 LI.socialComm.current = e.name;
                                                            /* -[ Load data ]- */
                                                                 var area = LiCi.$_(LI.socialComm.clName+'_area')[0];
                                                                 LI.socialComm.cleaner(area,e);
                                                                 e.load(area);                             
                                                       }
                                             }
                                        }(e));                             
                              /* -[ Load first available ]- */
                                   if (!this.first) {
                                        this.first = true;
                                        var area = LiCi.$_(this.clName+'_area')[0];
                                        LI.socialComm.cleaner(area,e);
                                        e.load(area);
                                   }
                         }
                    }
               }              
          };
         
         
/* Social buttons
----------------------------------------------- */         
     LI.ilike = {
          clName : 'li-ilike',
          likes : {
               title : 'Если запись понравилась',
               type : 'Like'
          },
          shares : {
               title : 'Поделиться с друзьями',
               type : 'Share'
          }
     };
     /* -----------[ Init ]----------- */
          LI.ilike.init = function() {    
         
               var likes = LiCi.$_(this.clName);
               if (likes.length > 0) {
                                                                          
                    for (i = 0; i<likes.length; i++) {
                         /* -[ Attach event ]- */
                              var parent = likes[i];
                              var uniq = parent.getAttribute('uniq');
                              LiCi.eventAdd (LiCi.$(this.clName+'_btn_item_Like_'+uniq), "click", function ( parent ) {
                                   return function () {
                                        LI.ilike.baloon( this, LI.ilike.likes, parent );
                                   }
                              }( parent ));
                              LiCi.eventAdd (LiCi.$(this.clName+'_btn_item_Share_'+uniq), "click", function ( parent ) {
                                   return function () {
                                        LI.ilike.baloon( this, LI.ilike.shares, parent );
                                   }
                              }( parent ));
                    }
               }
              
          };
     /* -----------[ Make baloon ]----------- */    
          LI.ilike.baloon = function( click, obj, parent ) {
              
               if (click.getAttribute('checked') == 'checked') {
                    this.clean();
                    click.setAttribute('checked',null);
               } else {                   
                    /* -[ Uncheck all opened ]- */
                         var checked = LiCi.$_('checked');
                         for (i = 0; i<checked.length; i++) {
                              checked[i].setAttribute('checked',null);
                         }
                         this.clean();
                    /* -[ Check current ]- */    
                         LiCi.$_add(click, 'checked');
                         click.setAttribute('checked','checked');
                    /* -[ Disable flash ]- */
                         var flash = document.body.getElementsByTagName("object");
                         for (f = 0; f<flash.length; f++) {
                              flash[f].style.visibility = 'hidden';
                         }                        
                   
                    var uniq = parent.getAttribute('uniq');
                    var url = parent.getAttribute('url');
                    var vkid = parent.getAttribute('vkid');
    
                    var postfix = obj.type+'_'+uniq;
                    var id = this.clName+'_baloon_'+postfix;
                    var baloonOld = LiCi.$(id);
                   
                    /* -[ Show if defined ]- */
                         if (baloonOld) {
                              baloonOld.style.display = 'block';
                         }
                    /* -[ Create if undefined ]- */
                         else {
                              var clName = this.clName+'_wrapper';                        
                              wrapperOld = LiCi.$_(clName);
                              if (wrapperOld.length > 0) {
                                   var wrapperNew = wrapperOld[0];
                              }
                              else {
                                   /* -[ Create wrapper ]- */
                                        var wrapperNew = document.createElement('div');
                                        wrapperNew.className = clName
                                        document.body.appendChild(wrapperNew);
                                   /* -[ Load libs ]- */    
                                        LiCi.require('//userapi.com/js/api/openapi.js?32');
                                        LiCi.require('//cdn.connect.mail.ru/js/loader.js');
                                        LiCi.require('//apis.google.com/js/plusone.js');
                                       // LiCi.require('//stg.odnoklassniki.ru/share/odkl_share.js');
                              }                                                 
                             
                              var cloneInner = this.clName+'_baloon_body_clone_'+postfix;
                              var tpl = '<div class="'+this.clName+'_baloon" id="'+id+'"><div class="'+this.clName+'_baloon_hdr"></div><div class="'+this.clName+'_baloon_body"><div class="'+this.clName+'_baloon_body_i"><i onclick="LI.ilike.clean();">x</i><strong>'+obj.title+'</strong><div class="'+this.clName+'_baloon_body_clone" id="'+cloneInner+'"></div></div></div><div class="'+this.clName+'_baloon_ftr"></div></div>';
                              new Insertion.Bottom(wrapperNew, tpl)
    
                              var baloonNew = LiCi.$(id);
                              //baloonNew.style.top = LiCi.offset.top( click ) +20 + 'px';
                              baloonNew.style.top = LiCi.offset.top( click ) - 200 -(LiCi.elemHeight( baloonNew ))+ 'px';
                              baloonNew.style.left = LiCi.offset.left( click ) - ((LiCi.elemWidth( baloonNew )/2) - (LiCi.elemWidth( click )/2)) + 'px';
                              baloonNew.zIndex = 1000;
                             
                              var clone = this.clone( obj.type, uniq );
                              clone.style.display = 'block';
                              LiCi.$(cloneInner).appendChild(clone);
                             
                              if (obj.type == 'Like') {
                              		LI.likethis.init( uniq );
                                   /* -[ Load FB ]- */
                                        var fb = LiCi.$('fb_like_'+uniq);
                                        fb.innerHTML = '<iframe src="http://www.facebook.com/plugins/like.php?href='+url+'&amp;layout=button_count&amp;show_faces=false&ampaction=like&amp;font=trebuchet+ms&amp;colorscheme=light&amp;" scrolling="no" frameborder="0" allowTransparency="true" style="height:20px;"></iframe>';
                                   /* -[ Load other ]- */
                                        setTimeout(function(){
                                             VK.init({apiId: vkid, onlyWidgets: true});
                                             VK.Widgets.Like("vk_like_"+uniq, {type: "mini", pageUrl : url });         
                                             //ODKL.init();
                                        }, 1*1000);
                              }
                         }
                    }
          };
     /* -----------[ Clean baloon ]----------- */
          LI.ilike.clean = function() {
               /* -[ Uncheck ]- */
                    var checked = LiCi.$_('checked');
                    for (i = 0; i<checked.length; i++) {
                         LiCi.$_del(checked[i], 'checked');
                    }
               /* -[ Hide layer ]- */
                    var baloons = LiCi.$_(this.clName+'_baloon');
                    for (j = 0; j<baloons.length; j++) {
                         baloons[j].style.display = 'none';
                    }
               /* -[ Enable flash ]- */
                    var flash = document.body.getElementsByTagName("object");
                    for (f = 0; f<flash.length; f++) {
                         flash[f].style.visibility = 'visible';
                    }                   
                   
          };
     /* -----------[ Clone html ]----------- */
          LI.ilike.clone = function( type, uniq ) {
               var node = LiCi.$(this.clName+'_'+type+'_'+uniq);
               if (node) {
                    var clone = node.cloneNode(true);
                    LiCi.$Node.Del( node );
                    return clone;
               }
          };
         
/* Social buttons
----------------------------------------------- */
     LI.share = {
          clName : 'share',
          likes : {
               title : 'Если запись понравилась',
               type : 'Like'
          },
          shares : {
               title : 'Поделиться с друзьями',
               type : 'Share'
          }
     };
     /* -----------[ Init ]----------- */
          LI.share.init = function() {    
              
               this.jName = 'li-J-'+this.clName;
               this.sName = 'li-S-'+this.clName;
               var likes = LiCi.$_(this.jName);
               if (likes.length > 0) {
                                                                          
                    for (i = 0; i<likes.length; i++) {
                         /* -[ Attach event ]- */
                              var parent = likes[i];
                              var uniq = parent.getAttribute('uniq');
                              LiCi.eventAdd (LiCi.$(this.jName+'_btn_item_Like_'+uniq), "click", function ( parent ) {
                                   return function () {
                                        LI.share.baloon( this, LI.share.likes, parent );
                                   }
                              }( parent ));
                              LiCi.eventAdd (LiCi.$(this.jName+'_btn_item_Share_'+uniq), "click", function ( parent ) {
                                   return function () {
                                        LI.share.baloon( this, LI.ilike.shares, parent );
                                   }
                              }( parent ));
                    }
               }
              
          };
     /* -----------[ Make baloon ]----------- */    
          LI.share.baloon = function( click, obj, parent ) {
              
               if (click.getAttribute('checked') == 'checked') {
                    this.clean();
                    click.setAttribute('checked',null);
               } else {                   
                    /* -[ Uncheck all opened ]- */
                         var checked = LiCi.$_('checked');
                         for (i = 0; i<checked.length; i++) {
                              checked[i].setAttribute('checked',null);
                         }
                         this.clean();
                    /* -[ Check current ]- */    
                         LiCi.$_add(click, 'checked');
                         click.setAttribute('checked','checked');
                    /* -[ Disable flash ]- */
                         var flash = document.body.getElementsByTagName("object");
                         for (f = 0; f<flash.length; f++) {
                              flash[f].style.visibility = 'hidden';
                         }                        
                   
                    var uniq = parent.getAttribute('uniq');
                    var url = parent.getAttribute('url');
                    var vkid = parent.getAttribute('vkid');                   
    
                    var postfix = obj.type+'_'+uniq;
                    var id = this.jName+'_baloon_'+postfix;
                    var baloonOld = LiCi.$(id);
                   
                    /* -[ Show if defined ]- */
                         if (baloonOld) {
                              baloonOld.style.display = 'block';
                         }
                    /* -[ Create if undefined ]- */
                         else {
                              var clName = this.jName+'_wrapper';
                              wrapperOld = LiCi.$_(clName);
                              if (wrapperOld.length > 0) {
                                   var wrapperNew = wrapperOld[0];
                              }
                              else {
                                   /* -[ Create wrapper ]- */
                                        var wrapperNew = document.createElement('div');
                                        wrapperNew.className = clName;
                                        document.body.appendChild(wrapperNew);
                                   /* -[ Load libs ]- */    
                                        LiCi.require('https://userapi.com/js/api/openapi.js?32');
                                        LiCi.require('https://cdn.connect.mail.ru/js/loader.js');
                                        LiCi.require('https://apis.google.com/js/plusone.js');
                                        //LiCi.require('http://stg.odnoklassniki.ru/share/odkl_share.js');
                              }                                                 
                             
                              var cloneInner = this.jName+'_baloon_body_clone_'+postfix;
                              var tpl = '<div class="'+this.sName+'_baloon '+this.jName+'_baloon" id="'+id+'"><div class="'+this.sName+'_baloon_hdr"></div><div class="'+this.sName+'_baloon_body"><div class="'+this.sName+'_baloon_body_i"><i onclick="LI.share.clean();">x</i><strong>'+obj.title+'</strong><div class="'+this.sName+'_baloon_body_clone" id="'+cloneInner+'"></div></div></div><div class="'+this.sName+'_baloon_ftr"></div></div>';
                              new Insertion.Bottom(wrapperNew, tpl);
    
                              var baloonNew = LiCi.$(id);
                              baloonNew.style.top = LiCi.offset.top( click ) - 200 -(LiCi.elemHeight( baloonNew ))+ 'px';
                              //baloonNew.style.top = LiCi.offset.top( click ) + 20 + 'px';
                              baloonNew.style.left = LiCi.offset.left( click ) - ((LiCi.elemWidth( baloonNew )/2) - (LiCi.elemWidth( click )/2)) + 'px';
                              baloonNew.zIndex = 1000;
                             
                              var clone = this.clone( obj.type, uniq );
                              clone.style.display = 'block';
                              LiCi.$(cloneInner).appendChild(clone);
                             
                              if (auth) {
                                   var nologged = LiCi.$_('li-J-share_src_native_Noauth_'+uniq);
                                   for (c = 0; c<nologged.length; c++) {
                                        LiCi.$Node.Del( nologged[c] );
                                   }
                              } else {
                                   var logged = LiCi.$_('li-J-share_src_native_Auth_'+uniq);
                                   for (c = 0; c<logged.length; c++) {
                                        LiCi.$Node.Del( logged[c] );
                                   }
                              }
                             
                              if (obj.type == 'Like') {
                              		LI.likethis.init( uniq );
                                   /* -[ Load FB ]- */
                                        var fb = LiCi.$('fb_like_'+uniq);
                                        fb.innerHTML = '<iframe src="https://www.facebook.com/plugins/like.php?href='+url+'&amp;layout=button_count&amp;show_faces=false&ampaction=like&amp;font=trebuchet+ms&amp;colorscheme=light&amp;" scrolling="no" frameborder="0" allowTransparency="true" style="height:20px;"></iframe>';
                                   /* -[ Load other ]- */
                                        setTimeout(function(){
                                             VK.init({apiId: vkid, onlyWidgets: true});
                                             VK.Widgets.Like("vk_like_"+uniq, {type: "mini", pageUrl : url });         
                                             //ODKL.init();
                                        }, 1*1000);
                              }
                         }
                    }
          };
     /* -----------[ Clean baloon ]----------- */
          LI.share.clean = function() {
               /* -[ Uncheck ]- */
                    var checked = LiCi.$_('checked');
                    for (i = 0; i<checked.length; i++) {
                         LiCi.$_del(checked[i], 'checked');
                    }
               /* -[ Hide layer ]- */
                    var baloons = LiCi.$_(this.jName+'_baloon');
                    for (j = 0; j<baloons.length; j++) {
                         baloons[j].style.display = 'none';
                    }
               /* -[ Enable flash ]- */
                    var flash = document.body.getElementsByTagName("object");
                    for (f = 0; f<flash.length; f++) {
                         flash[f].style.visibility = 'visible';
                    }                   
                   
          };
     /* -----------[ Clone html ]----------- */
          LI.share.clone = function( type, uniq ) {
               var node = LiCi.$(this.jName+'_src_'+type+'_'+uniq);
               if (node) {
                    var clone = node.cloneNode(true);
                    LiCi.$Node.Del( node );
                    return clone;
               }
          };         

         
/* Self porno lock
----------------------------------------------- */
     LI.agelock = {
          clName : 'li-agelock'
     }
     /* -----------[ Init ]----------- */
          LI.agelock.init = function() {
               if ( !this.check() ) {
                    this.popup();
               }
          };
     /* -----------[ Popup ]----------- */         
          LI.agelock.popup = function() {
               var shadow = LiCi.$_(this.clName)[0];
               if (!shadow) {
                    /* -[ Window ]- */
                         var parent = document.createElement('div');
                         parent.className = this.clName;
                         document.body.appendChild( parent );
                    /* -[ Shadow ]- */
                         var shadow = document.createElement('div');
                         shadow.className = this.clName + '_shadow';
                         shadow.style.height = LiCi.pageHeight() + 'px';
                         parent.appendChild( shadow );
                    /* -[ Wrapper ]- */    
                         var wrapper = document.createElement('div');
                         wrapper.className = this.clName + '_wrapper';
                         wrapper.style.top = LiCi.offset.body() + 150 +'px';
                         wrapper.style.left = (LiCi.pageWidth() - 950) / 2 + 'px';
                         parent.appendChild( wrapper );                   
                         wrapper.innerHTML = '<div class="'+this.clName+'_wrapper_inner"><p>Автор не рекомендует просмотр этой страницы посетителям, моложе 18 лет.<span><a href="#" onclick="LI.agelock.accept();return false;">Мне есть 18 лет, открыть страницу</a><a href="http://www.liveinternet.ru/top">На главную</a></span></p></div>';                                  
               }                   
          };         
     /* -----------[ Check ]----------- */    
          LI.agelock.check = function() {
              return true;
               var accepted = LiCi.getCookie('agelock');
               if (accepted != null) {
                    var cnt = 0;
                    var explode = accepted.split(',');
                    for (i = 0; i<explode.length; i++) {
                         if (curj == explode[i]) {
                              return true;
                         } else {
                              return false;
                         }
                    }                             
               } else {
                    return false;
               }
          };
     /* -----------[ Accept rule ]----------- */    
          LI.agelock.accept = function() {
               //LiCi.$Node.Del( LiCi.$_(this.clName)[0] );
               LiCi.$_(this.clName)[0].style.display = 'none';
               var accepted = LiCi.getCookie('agelock');
               if (accepted == null) {
                    LiCi.setCookie('agelock', Array(curj));
               } else {
                    var arr = accepted.split(',');
                    arr[arr.length] = curj;
                    LiCi.setCookie('agelock', arr);
               }
               return false;
          };    


/* Notifications
----------------------------------------------- */
     LI.notify = {
          clName : 'li-notify',
          lastTime : new Date().getTime()
     };
     /* -----------[ Init ]----------- */
          LI.notify.init = function() {
          	trigger = LiCi.$_('j-norify_trigger_disable')
          	if (trigger.length == 0) {
               var that = this;
               LiCi.eventAdd (document.body, "mousemove", function () {
                    setTimeout(function() {
                         that.alive();    
                    }, 0);
               });
               LiCi.eventAdd (window, "scroll", function () {
                    setTimeout(function() {
                         that.alive();    
                    }, 0);    
               });              
               this.check();          	
          	}              
          };
     /* -----------[ Check ]----------- */    
          LI.notify.check = function() {
               var that = this;
               setTimeout(function(){
                    if (((new Date().getTime() - that.lastTime) ) < 15*1000) {
                         //console.debug('Is alive!')
                         new Ajax.Request('/journal_proc.php?action=notify_json&v=1', {
                              asynchronous:true,
                              onComplete:function(request) {
                                   json = request.responseText.evalJSON(true);
                                   if(json.length > 0){
                                      LI.notify.show(json);
                                   }
                              }
                         });    
                    } else {
                         //console.debug('In not alive…');
                    }
                    LI.notify.check();
               }, 10*1000);
          };
     /* -----------[ Is alive? ]----------- */    
          LI.notify.alive = function() {
               var newTime= new Date().getTime();
               if(newTime>this.lastTime+500){
                   this.lastTime = new Date().getTime();    
                 }
          };
     /* -----------[ Show ]----------- */
          LI.notify.show = function(hash) {
               for ( itm in hash ) {
                    if (typeof(hash[itm]) == 'object') this.popup(hash[itm]);
               }
          };    
     /* -----------[ Create ]----------- */
          LI.notify.popup = function(obj) {
               /* -[ Wrapper ]- */
                    var area = LiCi.$_(this.clName);
                    if (area.length <= 0) {
                         var wrapper = document.createElement('div');
                         wrapper.className = this.clName;
						 if (LiCi.windowHeight() <= 600) wrapper.className = wrapper.className + ' ' + this.clName+'_Netbook';                         
                         wrapper.innerHTML = '<div class="'+this.clName+'_i"></div>';
                         // Video tizer checking and offset
                /*         if (LiCi.$_('li-j_videotizer_src').length > 0) {
                         	wrapper.style.right = "200px";
                         }*/
                         document.body.appendChild(wrapper);
                    }
               /* -[ Popup ]- */
                    var popup = document.createElement('div');
                    popup.className = this.clName+'_popup'+' '+this.clName+'_popup_'+obj['type'];
                    popup.innerHTML = obj['text'];
                    LiCi.$_(this.clName+'_i')[0].appendChild(popup);
                    var close = document.createElement('i');
                    close.title = 'Закрыть';
                    close.innerHTML = 'x';
                    popup.appendChild(close);
                    var that = this;
                    LiCi.eventAdd (close, "click", function () {
                         that.close(popup);
                    });                                                                               
               /* -[ Timer ]- */
                    if (obj['type'] != 'error') {
                         var that = this;
                         var interval = 5;
                         if (obj['time_show'] != 0) interval = obj['time_show'];
                         setTimeout(function(){                             
                              that.close(popup)
                         }, interval*1000);                                  
                    }
          };
     /* -----------[ Close ]----------- */
          LI.notify.close = function(obj) {
               LiCi.$Node.Del(obj);
          }
     /* -----------[ Clean ]----------- */
          LI.notify.clean = function(obj) {
               LiCi.$Node.Del(obj);
          }    
         
         

/* Move up link
----------------------------------------------- */              
	LI.moveup = {
	};
	/* -----------[ Init ]----------- */
		LI.moveup.init = function() {
			if (!LiCi.getBrowser.opera) {
				LiCi.eventAdd (window, "scroll", function () {
					var offset = LiCi.offset.body();
					var e = LiCi.$_('j-gl_moveup');
					if (offset > 400) {
						if (!e.length == 1) {
				 		var link = document.createElement('span');
				 		link.style.position = 'fixed';
				 		link.style.top = 0;
				 		link.style.right = 0;
				 		link.style.zIndex = 9999;
				 		link.className = 'j-gl_moveup b-gl_moveup';
				 		link.innerHTML = '<a href="#">наверх</a>';
				 		document.body.appendChild(link);		         		
						}
					}
					if (offset < 400) {
						if (e.length == 1) {
							LiCi.$Node.Del(e[0]);
						}
					}
				});			
			}
		};
		
/* Print version
----------------------------------------------- */              
	LI.printmedia = {
	};
	/* -----------[ Init ]----------- */
		LI.printmedia.init = function() {
			setCookie('ucss', 'print', expires, "/");
			window.location.href = document.location.href;
		};
	/* -----------[ Print ]----------- */
		LI.printmedia.print = function() {
			if (LiCi.getCookie('ucss') == 'print') {
				document.write('<link rel="stylesheet" type="text/css" media="screen" href="http://www.liveinternet.ru/ReActive/css/blog-print.css" />');
			}
			setCookie('ucss', 'normal', expires, "/");
		};
		

/* Chrome adv
----------------------------------------------- */
	LI.hdrBar = {
	     clName : 'li-plug',
	     /* -----------[ Init ]----------- */
		     init : function() {
		     	if (LiCi.getBrowser.chrome && LiCi.getCookie('li-plug_top') != 'closed') {
			    	this._insert();	
		     	}
		     },
		  /* -----------[ Insert ]----------- */
		     _insert: function() {
		     	// Check even or odd
			/* 	if (bbuserid%2 == 0) {
				 	LiCi.$(':gl_Top-plug').innerHTML = this._template('Glm', 'Читай, пиши, комментируй вместе с LiveInternet.<b>Дневники</b> Offline', 'http://www.liveinternet.ru/click;libanner240');				 					 	
			 	} else {
				 	LiCi.$(':gl_Top-plug').innerHTML = this._template('4k', 'У Google Chrome появилось отличное расширение для удобного чтения дневников LiveInternet! <a target="_blank" href="http://www.liveinternet.ru/click;libanner800?https://chrome.google.com/webstore/detail/liveinternet%D0%B4%D0%BD%D0%B5%D0%B2%D0%BD%D0%B8%D0%BA%D0%B8-offl/oabmdoehbmfjibhoidonpdmjjgbkppbp?utm_source=chrome-ntp-icon">Хотите попробовать?</a><i class="gl_Top-plug_logo"></i>', 'http://www.liveinternet.ru/click;libanner800');
			 	}
			 	// Position and events
		     	LiCi.$(':gl_Top-plugI').style.width = LiCi.elemWidth(LiCi.$(':gl_TopI'))+'px';
				LiCi.eventAdd (LiCi.$(':gl_Top-plug_close'), "click", function () {
					LiCi.$Node.Del(LiCi.$(':gl_Top-plug'));
					LiCi.setCookie('li-plug_top', 'closed');
					return false;
				});*/
		     },
		  /* -----------[ Template ]----------- */
		  	 _template: function(classname, string, url) {return '<div class="gl_Top-plug_'+classname+'"><div class="gl_Top-plug"><div class="gl_Top-plugI" id=":gl_Top-plugI">'+string+'<a class="gl_Top-plug_button" target="_blank" href="'+url+'?https://chrome.google.com/webstore/detail/liveinternet%D0%B4%D0%BD%D0%B5%D0%B2%D0%BD%D0%B8%D0%BA%D0%B8-offl/oabmdoehbmfjibhoidonpdmjjgbkppbp?utm_source=chrome-ntp-icon" title="Установить расширение">Установить</a><i class="gl_Top-plug_close" id=":gl_Top-plug_close"><a class="" href="#">Закрыть</a> <b>[x]</b></i></div></div></div>';}
     };

/* Mass init
----------------------------------------------- */
     /* -----------[ Window load ]----------- */
          LiCi.eventAdd (window, "load", function () {
               /* -[ Picture preview ]- */
                    LI.bigpic.init();
               /* -[ Fast tags ]- */
                    if ( auth ) {
                         LI.fasttags.init();
                    }
          });
     /* -----------[ DOM ready ]----------- */    
          LiCi.domReady (function(){
          		/* -[ Video tiser ]- */
          		//	LI.videotizer.init();
			   	/* -[ Move up button ]- */
			   		LI.moveup.init();
               	/* -[ Like buttons ]- */
                    // LI.ilike.init();
                    LI.share.init();
               /* -[ Browser toolbars ]- */
                    if (!LI.isPartner) {
                         //LI.ftrBar.init();
                         LI.hdrBar.init();
                    }
               /* -[ Raad more ]- */
                    LI.blogs.readmore.init();
               /* -[ Who likes ]- */
                    LI.blogs.whoLikes.init();
               /* -[ Calendar pop-up ]- */
               		LI.blogs.calendar.init();
               /* -[ Tasklist ]- */
	               	LI.blogs.tasklist.init();
	           /* -[ Scroll right banner ]- */
		           	LI.blogs.sidebanner.init();
	           /* -[ Visislbe area counter ]- */
		           	LI.blogs.vcounter.init();
               /* -[ Load social comments ]- */
                    // LI.socialComm.init();
               if ( auth ) {
                    /* -[ Blog fast comments ]- */
                         LI.blogs.fastcom.init();              
                    /* -[ Blog ava change ]- */
                         LI.avachange.init( 'ProTop-Vcard-AvaPicInner' );
                         LI.avachange.init( 'AvatarInner' );                   
                    /* -[ Blog like ]- */
                         LI.likethis.init();              
                    /* -[ Global fast search ]- */    
                         LI.fsearch.init();
                    /* -[ Notify check ]- */
                         LI.notify.init();
                    /* -[ Add to friends ]- */
                    	LI.blogs.addFriend.init();
                    /* -[ Draft actions confirm ]- */
                    	LI.blogs.draftLinks.init();
               }
          });
          
function pviev() {
	LI.printmedia.init();
}