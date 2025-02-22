function LoadPage() {
	var oHeader = document.getElementById("content_header");
	var oIntro = document.getElementById("content_intro");
	var oContent = document.getElementById("content_content");
	var aItems;

	var aID = GetMenuID().split(',');
	switch (aID[0]) {
		case "home":
			LoadHome(oHeader, oIntro, oContent);
			break;
		case "bronze":
			aItems = GetBronzeArray();
			LoadWork(oHeader, oIntro, oContent, "bronze", "Bronzen Beelden", aID[1], aItems);
			break;
		case "pottery":
			aItems = GetPotteryArray();
			LoadWork(oHeader, oIntro, oContent, "pottery", "Keramiek", aID[1], aItems);
			break;
		case "portretten":
			aItems = GetPortrettenArray();
			LoadWork(oHeader, oIntro, oContent, "portretten", "Portretten", aID[1], aItems);
			break;

		case "stone":
			aItems = GetStoneArray();
			LoadWork(oHeader, oIntro, oContent, "stone", "Stenen Beelden", aID[1], aItems);
			break;
		case "brick":
			aItems = GetBrickArray();
			LoadWork(oHeader, oIntro, oContent, "brick", "Baksteen", aID[1], aItems);
			break;
		case "plaquettes":
			aItems = GetPlaquettesArray();
			LoadWork(oHeader, oIntro, oContent, "plaquettes", "Plaquettes", aID[1], aItems);
			break;
		case "coin":
			aItems = GetCoinArray();
			LoadWork(oHeader, oIntro, oContent, "coin", "Penningen &amp; Munten", aID[1], aItems);
			break;
		case "relief":
			aItems = GetReliefArray();
			LoadWork(oHeader, oIntro, oContent, "relief", "Reliefs", aID[1], aItems);
			break;
		case "contact":
			LoadContact(oHeader, oIntro, oContent);
			break;
	}
	InitializeMenu();
}

function LoadWork(oHeader, oIntro, oContent, sType, sTypeDesc, sLocation, aItems) {
	oHeader.innerHTML = "De " + sTypeDesc + " van Joop Hekman uit " + sLocation;
	oIntro.innerHTML = "Hier ziet u een overzicht van alle <b>" + sTypeDesc + "</b> die gemaakt zijn door Joop Hekman in <b>" + sLocation + "</b>";

	var oParagraph, oSpan;
	var sHTML = "";
	var iIndex1, iIndex2, iLen;

	iLen = aItems.length;
	for (iIndex1 = 0; iIndex1 < iLen; iIndex1++) {
		if (aItems[iIndex1][1] == sLocation) {
			sHTML = "<img src='pictures/" + sType + "/" + aItems[iIndex1][0] + "' alt='" + aItems[iIndex1][3] + "' title='" + aItems[iIndex1][3] + "'><br>";
			sHTML += "<b>" + aItems[iIndex1][3] + "</b><span>";
			if (aItems[iIndex1][4] != "") {
				sHTML += " (" + aItems[iIndex1][4];
				if (aItems[iIndex1][2] != "") sHTML += ", " + aItems[iIndex1][2];
				sHTML += ")";
			}
			sHTML += "</span>";

			oParagraph = document.createElement('p');
			oParagraph.id = "detailpicture";
			oParagraph.innerHTML = sHTML;
			oContent.appendChild(oParagraph);

			//setTimeout(function() {LoadWorkDetailPicture(sType, aItems[iIndex1][0], aItems[iIndex1][3], aItems[iIndex1][4], aItems[iIndex1][2]);}, 2000);
			ResizeDetailPicture();

			for (iIndex2 = 0; iIndex2 < iLen; iIndex2++) {
				if (aItems[iIndex2][1] == sLocation) {
					oSpan = document.createElement('span');
					oSpan.className = 'thumbpicture';
					oSpan.innerHTML = "<img class='small' src='pictures/" + sType + "/" + aItems[iIndex2][0] + "' alt='" + aItems[iIndex2][3] + "' title='" + aItems[iIndex2][3] + "' onclick=\"LoadWorkDetailPicture('" + sType + "', '" + aItems[iIndex2][0] + "', '" + aItems[iIndex2][3] + "', '" + aItems[iIndex2][4] + "', '" + aItems[iIndex2][2] + "');\">";
					oContent.appendChild(oSpan);
				}
			}

			break;
		}
	}
}

function LoadWorkDetailPicture(sType, sImageURI, sName, sDescription, sYear) {
	var oParagraph = document.getElementById('detailpicture');
	oParagraph.childNodes[0].src = "pictures/" + sType + "/" + sImageURI;
	oParagraph.childNodes[0].alt = sName;
	oParagraph.childNodes[0].title = sDescription;

	oParagraph.childNodes[2].innerHTML = sName;
	if (sDescription != "") {
		sDescription = " (" + sDescription;
		if (sYear != "") sDescription += ", " + sYear;
		sDescription += ")";
	}
	oParagraph.childNodes[3].innerHTML = sDescription;
	oParagraph.firstChild.removeAttribute('width');
	oParagraph.firstChild.removeAttribute('height');
	ResizeDetailPicture();
}

function ResizeDetailPicture() {
	var oIMG = document.getElementById('detailpicture').firstChild;
	var iWidth = parseInt(oIMG.width);
	var iHeight = parseInt(oIMG.height);
	if (iWidth < 100) return setTimeout('ResizeDetailPicture();', 100);
	if (iHeight < 100) return setTimeout('ResizeDetailPicture();', 100);

	if (iWidth > 300 || iHeight > 300) {
		var iDiv = iWidth / iHeight;
		while (iWidth > 300 || iHeight > 300) {
			iWidth -= iDiv;
			iHeight -= 1;

			if ((iWidth < 300 && iHeight < 300) || (iWidth < 1 || iHeight < 1)) break;
		}
	}
	oIMG.width = iWidth;
	oIMG.height = iHeight;

	if (oIMG.height > 300) return setTimeout('ResizeDetailPicture(' + oIMG.toSource() + ');', 100);
	var oParagraph = document.getElementById('detailpicture');
	oParagraph.style.paddingBottom = (300 - oIMG.height) + "px";
}

function LoadHome(oHeader, oIntro, oContent) {
	oHeader.innerHTML = "Welkom op de website van Joop Hekman";
	oIntro.innerHTML = "Op deze website vindt u alle werken van Joop Hekman, aan deze website wordt momenteel nog wel gewerkt...";

	var oParagraph;

	oParagraph = document.createElement('p');
	oParagraph.innerHTML = "";
	oContent.appendChild(oParagraph);

	oParagraph = document.createElement('p');
	oParagraph.innerHTML = "";
	oContent.appendChild(oParagraph);

	oParagraph = document.createElement('p');
	oParagraph.innerHTML = "";
	oContent.appendChild(oParagraph);
}

function LoadContact(oHeader, oIntro, oContent) {
	oHeader.innerHTML = "Contactinformatie";
	oIntro.innerHTML = "Als u contact met mij op wil nemen kan dat op: <a href='mailto:jurrian@joophekman.nl?subject=Website Joop Hekman'>jurrian@joophekman.nl</a>";
}

function ShowMenuItem() {
	var oObject = this;
	for (var i = 0; i < oObject.childNodes.length; i++) {
		if (oObject.childNodes[i].nodeName == "UL") {
			oObject.childNodes[i].parentNode.firstChild.className += " menuactive";
			oObject.childNodes[i].style.display = "block";
		}
	}
}

function HideMenuItem() {
	var oObject = this;
	for (var i = 0; i < oObject.childNodes.length; i++) {
		if (oObject.childNodes[i].nodeName == "UL") {
			oObject.childNodes[i].parentNode.firstChild.className = oObject.childNodes[i].parentNode.firstChild.className.replace("menuactive", "");
			oObject.childNodes[i].style.display = "none";
			return;
		}
	}
}

function InitializeMenu() {
	var oObjects = document.body.getElementsByTagName("LI");
	for (var i = 0; i < oObjects.length; i++) {
		var oObject = oObjects[i];
		for (var j = 0; j < oObject.childNodes.length; j++) {
			if (oObject.childNodes.item(j).nodeName == "UL") {
				oObject.onmouseover = ShowMenuItem;
				oObject.onmouseout = HideMenuItem;

				for (var j = 0; j < oObject.childNodes.length; j++) if (oObject.childNodes.item(j).nodeName == "A") oObject.childNodes.item(j).className = "menuparent";
			}
		}
	}
}

function GetMenuID() {
	var sResult = "home,0";
	var sSearch = window.location.search;
	var iStart = sSearch.indexOf("id=");
	if (iStart != -1) {
		sResult = sSearch.substring(iStart + 3, sSearch.length);
		sResult = sResult.replace(/%20/g, " ");
	}
	return sResult;
}
