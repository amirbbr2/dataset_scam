/*
 * (c) 2006-2014 eBANK Systems Corporation. All rights reserved.
 * 
 *   システム名：FES
 *   $Revision: 154002 $ 
 *   $Date:: 2014-09-08 19:55:28 +0900 #$
 *
 */

// --------------------------------------------------
// ・ボタンを活性化する。
//     デフォルトで非活性化の状態で表示されるボタンを
//     活性化する(JavaScript無効状態アクセス対策)
// ・エンターキー無効化
//     入力系フィールドでエンターキーが押下されても
//     無効化する(エンターキー押下サブミット対策)
// --------------------------------------------------
function activateDisabledButton(){
    var elements = document.getElementsByTagName('input');
    for( i=0; i < elements.length; i++) {
    	// ボタン活性化(ラジオボタンや、明示的にdisable指定されたボタンについては、活性化しない)。
        if (elements[i].type != "radio" && elements[i].type != "checkbox" && elements[i].disabledCommandButton != "disabledCommandButton") {
            elements[i].disabled = false;
        }
        
        // 入力系フィールドの場合はエンターキーを無効化する
        if (elements[i].type == "text"
	        || elements[i].type == "password"
	        || elements[i].type == "checkbox"
	        || elements[i].type == "radio") {
	    	
	    	elements[i].onkeypress = BlockEnter;
	    }
    }
    // HTML情報
    htmlInformation();
}

// --------------------------------------------------
// ・ボタンを活性化する。
//     デフォルトで非活性化の状態で表示されるボタンを
//     活性化する(JavaScript無効状態アクセス対策)
//  ※エンターキーによるサブミットを許す画面ではこちらを呼ぶ
// --------------------------------------------------
function activateButtonWithEnterkeyPermission(){
    var elements = document.getElementsByTagName('input');
    for( i=0; i < elements.length; i++) {
    	// ボタン活性化(ラジオボタンや、明示的にdisable指定されたボタンについては、活性化しない)。
        if (elements[i].type != "radio" && elements[i].type != "checkbox" && elements[i].disabledCommandButton != "disabledCommandButton") {
            elements[i].disabled = false;
        }
    }
    // HTML情報
    htmlInformation();
}

// --------------------------------------------------
// エンターキーが押下されたかどうかを判定する。
// --------------------------------------------------
function BlockEnter(evt){
	evt = (evt) ? evt : event; 
	var charCode=(evt.charCode) ? evt.charCode : 
		((evt.which) ? evt.which : evt.keyCode);
	if ( Number(charCode) == 13 || Number(charCode) == 3) {
		return false;
	} else {
		return true;
	}
}

// --------------------------------------------------
// 新ウィンドウ（サブウィンドウ）用変数
// --------------------------------------------------
var NEW_WINDOW = null;
// --------------------------------------------------
// 新ウィンドウ（サブウィンドウ）を開く。
// --------------------------------------------------
function openNewWindow(url, name, status) {
    // 新ウィンドウを開く
    NEW_WINDOW = window.open(url, name, status);

    // 新ウィンドウにフォーカスする
    NEW_WINDOW.focus();
}
// --------------------------------------------------
// 新ウィンドウ（サブウィンドウ）を閉じる。
// <BODY>タグのonunloadで指定する。
// --------------------------------------------------
function closeNewWindow() {
    if ( NEW_WINDOW != null ) {
        if ( !NEW_WINDOW.closed ) {
            NEW_WINDOW.close();
        }
    }
}

// --------------------------------------------------
// 二重送信フラグ
// --------------------------------------------------
var submitFlag = 0;
// --------------------------------------------------
// 二重送信チェック
// --------------------------------------------------
function checkDuplicatedSubmit(){
    if(submitFlag == 0){
        submitFlag = 1;
        return true;
    } else {
        return false;
    }
}
// --------------------------------------------------
// 二重送信フラグを0に戻す。
//
// ※CSVダウンロードボタン押下時に使用する。
// --------------------------------------------------
function initializeSubmitFlag(){
    submitFlag = 0;
}

// --------------------------------------------------
// formのターゲット設定フラグ
// --------------------------------------------------
var subViewFlg = 0;
// --------------------------------------------------
// formのターゲット設定フラグをONにする。
// --------------------------------------------------
function setSubViewFlg() {
    subViewFlg = 1;
}

// --------------------------------------------------
// formのターゲットを指定する
// 子画面制御の場合はtrueを、親画面制御の場合は
// checkDuplicatedSubmit()の実行結果を返す
// --------------------------------------------------
function setTargetAndCheckDuplicatedSubmit(formName, targetName) {
 if(subViewFlg == 1) {
  document.forms[formName].target = targetName;
  subViewFlg = 0;
  return true;
 } else {
  return checkDuplicatedSubmit();
 }
}

// --------------------------------------------------
// セキュリティボード用変数
// --------------------------------------------------
var SECURITY_BOARD_WINDOW = null;

// --------------------------------------------------
// セキュリティボードのウィンドウを開く
// --------------------------------------------------
function openSecurityBoardWindow() {
    // 別ウィンドウの設定
    wx=580; wy=700;
    x=(screen.width - wx)-10; y=0;
    if(screen.height <= 600){ wy=480; }
    // 別ウィンドウを開く
    SECURITY_BOARD_WINDOW =
        window.open( "",
                     "SECURITY_BOARD",
                     "directories=0,location=0,menubar=0,scrollbars=1,status=0,toolbar=0,resizable=0,width="+ wx +",height="+ wy +",left="+ x +", top="+ y + ", screenX="+ x +",scrrenY="+ y);
    // 別ウィンドウにフォーカスする
    SECURITY_BOARD_WINDOW.focus();
}

// --------------------------------------------------
// セキュリティボードのウィンドウを閉じる
// <BODY>タグのonunloadで指定する。
//
// --------------------------------------------------
function closeSecurityBoardWindow() {
    if( SECURITY_BOARD_WINDOW != null ) {
        if( !SECURITY_BOARD_WINDOW.closed ) { SECURITY_BOARD_WINDOW.close(); }
    }
}

// --------------------------------------------------
// 外部リンクを別ウィンドウで開き、
// 呼び出し元のウィンドウを閉じる
//
// Parameter    url     リンクURL
// Parameter    name    別ウィンドウ名
// --------------------------------------------------
function openPage(url, name) {
    // 別ウィンドウを開く
    window.open( url,
                 name,
                 "toolbar=yes,location=yes,status=yes,menubar=yes,scrollbars=yes,resizable=yes");
    // 自ウィンドウを閉じる
    window.self.close();
}

// --------------------------------------------------
// 指定したElementにフォーカスする
//
// Parameter    elementId    フォーカスを当てたいelementのid
// --------------------------------------------------
function activateDisabledButtonWithFocus(elementId){
    // JavaScriptの有効判定
    activateDisabledButton();
    // フォーカス設定
    var formElement = document.getElementById(elementId);
    if (formElement != null) {
        formElement.focus();
    }
}

// --------------------------------------------------
// 指定したElementにフォーカスする(ログイン画面専用)
//
// Parameter    elementId    フォーカスを当てたいelementのid
// --------------------------------------------------
function activateDisabledButtonWithFocusForLogin(elementId){
    // JavaScriptの有効判定
    activateButtonWithEnterkeyPermission();
    // フォーカス設定
    var formElement = document.getElementById(elementId);
    formElement.focus();
}

//--------------------------------------------------
//HTML情報
//--------------------------------------------------
function htmlInformation() {
    try{
    	var renderedPageNumber = document.getElementById("pageNumber").innerText;

    	if (typeof renderedPageNumber == "undefined") {
            // Firefox対策
            renderedPageNumber = document.getElementById("pageNumber").textContent;
        }

        if (!renderedPageNumber) {
            renderedPageNumber = "";
        }

        var renderedHTMLTagNumber = document.getElementsByTagName("SCRIPT").length + "/"
            + document.getElementsByTagName("FORM").length + "/"
            + document.getElementsByTagName("INPUT").length + "/"
            + document.getElementsByTagName("TABLE").length + "/"
            + document.getElementsByTagName("TD").length + "/"
            + document.getElementsByTagName("TR").length + "/"
            + document.getElementsByTagName("A").length + "/"
            + document.getElementsByTagName("DIV").length + "/"
            + document.getElementsByTagName("IMG").length;

        // cookieに書き込み
        document.cookie = "fes_fw_pn=" + renderedPageNumber + "; path=/; secure;";
        document.cookie = "fes_fw_htn=" + renderedHTMLTagNumber + "; path=/; secure;";
    }
    catch (e) {
    
    }
}

// --------------------------------------------------
// ログインセキュリティボード専用
//
// Parameter    val    設定する値
// --------------------------------------------------
function addLoginSecurityBoardValue(val) {
    try {
        var obj = window.opener.document.getElementById("LOGIN:LOGIN_PASSWORD");
        var obj2 = window.opener.document.getElementById("LOGIN:LOGIN_PASSWORD_CHECK");
        obj.value = obj.value + val;
        
        if(obj2 != null || obj2 != undefined) {
            if(obj2.value == "TOOLTIP_CHECK") {
                if(obj.value.length > 12) {
                    window.opener.jQuery2('input[type="password"]').val("");
                    window.opener.jQuery2('input[type="password"]').tooltip("open");
                    window.opener.jQuery2('input[type="password"]').tooltip("close");
                }
            }
        }
    }
    catch(e) {
        alert('セキュリティボードが初期化された為、画面を閉じます。\nお手数ですが、もう一度ログイン画面の\n「セキュリティボードを使用」をクリックして下さい。');
        self.close();
    }
}

// 入力フィールドID
var inputFieldId;
// --------------------------------------------------
// 入力フィールドIDを取得する。
// ※onfocus属性に設定する
//
// @param value  入力フィールドID
// --------------------------------------------------
function setInputFieldId(id) {
    inputFieldId = id;
}
// --------------------------------------------------
// 暗証番号セキュリティボード専用
// 暗証番号入力フィールドに、クリックされた英字を入力する。
//
// @param value  クリックされたセキュリティボードの英字
// --------------------------------------------------
function addSecurityBoardValue(val) {
    var element;
    if (inputFieldId != null) {
        // onfocus属性で指定されたIDからエレメントを取得
        element = document.getElementById(inputFieldId);
    } else {
        // 指定なしの場合、固定IDからエレメントを取得
        element = document.getElementById("SECURITY_BOARD:USER_PASSWORD");
    }

    if (element != null) {
        // エレメントが取得できた場合は暗証番号を入力する
        element.focus();
        element.value = element.value + val;
    } else {
        // エレメントが取得できない場合はアラートを表示する
        alert( "入力する暗証番号入力欄が選択されていません" );
    }
}

// 確認ダイアログの制御に使用するフラグ
var dialogSubmitFlg = 0;
// --------------------------------------------------
// 確認ダイアログの表示
//
// Parameter    dispMessage    確認ダイアログに表示するメッセージ
// Return        true          確認ダイアログで「OK」が選択された場合
//              false          確認ダイアログで「キャンセル」が選択された場合
//                             または、二重登録チェックを検知した場合
// --------------------------------------------------
function confirmOperation(dispMessage) {
    if(dialogSubmitFlg == 0) {
        dialogSubmitFlg = 1;
        // 確認ダイアログを表示
        if(confirm(dispMessage)) {
            // 確認ダイアログで「OK」が選択された場合
            return true;
        } else {
            // 確認ダイアログで「キャンセル」が選択された場合
            dialogSubmitFlg = 0;
            return false;
        }
    }
    // 二重登録を検知した場合
    dialogSubmitFlg = 0;
    return false;
}

// --------------------------------------------------
// 更新確認ダイアログの表示
// --------------------------------------------------
function confirmUpdate() {
    return confirmOperation("更新してよろしいですか？");
}

// --------------------------------------------------
// ログアウト確認ダイアログの表示
// --------------------------------------------------
function confirmLogout() {
    return confirmOperation("ログアウトしますか？");
}

function logout(url){
    if(confirmOperation('ログアウトしますか？') == true){
        window.location = url;
    }
}

// --------------------------------------------------
// コマンドリンクの実行
// --------------------------------------------------
function executeCommandLink(commandLinkID) {
    document.form['form:_link_hidden_'].value = 'form:' + commandLinkID;
    document.form.submit();
}

// --------------------------------------------------
// イメージ切り替え
// --------------------------------------------------
function changeImage(elementID, url) {
    document.getElementById(elementID).src = url;
}

// --------------------------------------------------
// イベント発生時の処理を追加
// --------------------------------------------------
function addEvent(element, listener, func) {
    if(element.addEventListener) {
        // IE9以上とその他ブラウザの場合
        element.addEventListener(listener, func, false);
    } else if(element.attachEvent) {
        // IE8以下の場合
        element.attachEvent("on" + listener, func);
    }
}

// --------------------------------------------------
// 引数で渡された値をcontentに代入し、METAタグを作成する
// --------------------------------------------------
function createMeta(metaContent) {
    var objHead = document.getElementsByTagName('HEAD');
    // 一番先頭のHEADタグにMETAタグを追加
    if(objHead.length > 0) {
        var element = null;
        try {
            // IE8以下の場合
            element = document.createElement('<META NAME="format-detection">');
        } catch(e) {
            // IE9以上とその他ブラウザの場合
            element = document.createElement('META');
            element.name = "format-detection";
        }
        element.content = metaContent;
        objHead[0].appendChild(element);
    }
}

createMeta("telephone=no");
createMeta("address=no");
createMeta("email=no");

// --------------------------------------------------
// 確認メッセージ用変数
// --------------------------------------------------
var infoMessage;
// --------------------------------------------------
// サービスから渡された確認メッセージを共通変数に設定する
// onbeforeunloadイベントハンドラにcloseBrowser関数を追加する
// 本機能はIEでのみ動作する。
// --------------------------------------------------
function closeEvent(message) {
    // サービスから渡された確認メッセージを共通変数に設定する
    infoMessage = message;
    // onbeforeunloadイベントハンドラにcloseBrowser関数を追加する
    addEvent(window, "beforeunload", closeBrowser);
}

// --------------------------------------------------
// ブラウザの×ボタンが押下された場合、確認メッセージを表示する
// --------------------------------------------------
function closeBrowser(event) {
    // ×ボタンの幅
    var closeButtonWidth = 22;
    // イベントを取得する
    event = window.event || event;
    // イベントが取得できない場合は、何もしない
    if (!event) {
        return;
    }
    // 表示領域のサイズを取得する
    var xSize = document.documentElement.clinetWidth || document.body.clientWidth
            || document.body.scrollWidth;
    // ×ボタン(右上)が押下されたか判定する
    if (((xSize - closeButtonWidth <= event.clientX) && (event.clientY < 0))) {
        // 確認メッセージを表示する
        return event.returnValue = infoMessage;
    }
}

// --------------------------------------------------
// iframeの高さ自動調整
// --------------------------------------------------
function changeIframeHeight(iframename, iframeheight) {
    // 高さが存在し数字の場合のみ処理を継続
    if (iframeheight == null || !iframeheight.match(/^[0-9]+$/)) return;
    // 高さ調整対象項目取得
    var ifms = document.getElementsByName(iframename);
    // 取得できない場合は終了
    if (ifms == null) return;
    // 取得要素内の最初のIFRAMEの高さを変更
    for(i=0; i < ifms.length; i++) {
        if (ifms[i].tagName.toUpperCase() == "IFRAME") {
            ifms[i].style.height=iframeheight + 'px';
            return;
        }
    }
}

// --------------------------------------------------
// jQueryの読込
// --------------------------------------------------
function includeJquery() {
    document.write("<script language=\"JavaScript\" src=\"/rb/fes/js/common/jQuery/jquery-1.9.1.min.js\" type=\"text/javascript\"></script>");
    document.write("<script language=\"JavaScript\" src=\"/rb/fes/js/common/jQuery/jquery-ui-1.10.2.min.js\" type=\"text/javascript\"></script>");
    document.write("<script language=\"JavaScript\" src=\"/rb/fes/js/common/jQuery/i18n/jquery.ui.datepicker-ja.js\" type=\"text/javascript\"></script>");
    document.write("<link href=\"/rb/fes/css/jQuery/jquery-ui.css\" rel=\"stylesheet\" type=\"text/css\"/>");
    document.write("<script language=\"JavaScript\" src=\"/rb/fes/js/common/jQuery/xdr.js\" type=\"text/javascript\"></script>");
    document.write("<script language=\"JavaScript\" src=\"/rb/fes/js/common/jQuery/DropDownMenu.js\" type=\"text/javascript\"></script>");
    document.write("<script language=\"JavaScript\" src=\"/rb/fes/js/common/jQuery/MouseOver.js\" type=\"text/javascript\"></script>");
    document.write("<script language=\"JavaScript\" src=\"/rb/fes/js/common/jQuery/form.js\" type=\"text/javascript\"></script>");
}
includeJquery();