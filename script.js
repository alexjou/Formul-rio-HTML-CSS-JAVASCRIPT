var nome = document.querySelector('#nome'),
  email = document.querySelector('#email'),
  cell = document.querySelector('#cell'),
  password = document.querySelector('#password'),
  confirmPassword = document.querySelector('#confirmPassword'),
  mySVG = document.querySelector('.svgContainer'),
  armL = document.querySelector('.armL'),
  armR = document.querySelector('.armR'),
  eyeL = document.querySelector('.eyeL'),
  eyeR = document.querySelector('.eyeR'),
  nose = document.querySelector('.nose'),
  mouth = document.querySelector('.mouth'),
  mouthBG = document.querySelector('.mouthBG'),
  mouthSmallBG = document.querySelector('.mouthSmallBG'),
  mouthMediumBG = document.querySelector('.mouthMediumBG'),
  mouthLargeBG = document.querySelector('.mouthLargeBG'),
  mouthMaskPath = document.querySelector('#mouthMaskPath'),
  mouthOutline = document.querySelector('.mouthOutline'),
  tooth = document.querySelector('.tooth'),
  tongue = document.querySelector('.tongue'),
  chin = document.querySelector('.chin'),
  face = document.querySelector('.face'),
  eyebrow = document.querySelector('.eyebrow'),
  outerEarL = document.querySelector('.earL .outerEar'),
  outerEarR = document.querySelector('.earR .outerEar'),
  earHairL = document.querySelector('.earL .earHair'),
  earHairR = document.querySelector('.earR .earHair'),
  hair = document.querySelector('.hair');
var caretPos,
  curEmailIndex,
  screenCenter,
  svgCoords,
  eyeMaxHorizD = 20,
  eyeMaxVertD = 10,
  noseMaxHorizD = 23,
  noseMaxVertD = 10,
  dFromC, eyeDistH, eyeLDistV, eyeRDistV, eyeDistR, mouthStatus = "small";

cell.addEventListener('keypress', (e) => mascaraTelefone(e.target.value)) // Dispara quando digitado no campo
cell.addEventListener('change', (e) => mascaraTelefone(e.target.value)) // Dispara quando autocompletado o campo

const mascaraTelefone = (valor) => {
  valor = valor.replace(/\D/g, "")
  valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2")
  valor = valor.replace(/(\d)(\d{4})$/, "$1-$2")
  cell.value = valor // Insere o(s) valor(es) no campo
}

function getField(e) {
  switch (e) {
    case 'nome':
      getCoord(nome);
      break;
    case 'email':
      getCoord(email);
      break;
    case 'cell':
      getCoord(cell);
      break;
    case 'confirmPassword':
      getCoord(confirmPassword);
      break;
    default:
      console.log("teste");
  }
}
function getCoord(campo) {
  var carPos = campo.selectionEnd,
    div = document.createElement('div'),
    span = document.createElement('span'),
    copyStyle = getComputedStyle(campo),
    campoCoords = {}, caretCoords = {}, centerCoords = {}
    ;
  [].forEach.call(copyStyle, function (prop) {
    div.style[prop] = copyStyle[prop];
  });
  div.style.position = 'absolute';
  document.body.appendChild(div);
  div.textContent = campo.value.substr(0, carPos);
  span.textContent = campo.value.substr(carPos) || '.';
  div.appendChild(span);

  campoCoords = getPosition(campo);
  caretCoords = getPosition(span);
  centerCoords = getPosition(mySVG);
  svgCoords = getPosition(mySVG);
  screenCenter = centerCoords.x + (mySVG.offsetWidth / 2);
  caretPos = caretCoords.x + campoCoords.x;

  dFromC = screenCenter - caretPos;
  var pFromC = Math.round((caretPos / screenCenter) * 100) / 100;
  if (pFromC < 1) {

  } else if (pFromC > 1) {
    pFromC -= 2;
    pFromC = Math.abs(pFromC);
  }

  eyeDistH = -dFromC * .05;
  if (eyeDistH > eyeMaxHorizD) {
    eyeDistH = eyeMaxHorizD;
  } else if (eyeDistH < -eyeMaxHorizD) {
    eyeDistH = -eyeMaxHorizD;
  }

  var eyeLCoords = { x: svgCoords.x + 84, y: svgCoords.y + 76 };
  var eyeRCoords = { x: svgCoords.x + 113, y: svgCoords.y + 76 };
  var noseCoords = { x: svgCoords.x + 97, y: svgCoords.y + 81 };
  var mouthCoords = { x: svgCoords.x + 100, y: svgCoords.y + 100 };
  var eyeLAngle = getAngle(eyeLCoords.x, eyeLCoords.y, campoCoords.x + caretCoords.x, campoCoords.y + 25);
  var eyeLX = Math.cos(eyeLAngle) * eyeMaxHorizD;
  var eyeLY = Math.sin(eyeLAngle) * eyeMaxVertD;
  var eyeRAngle = getAngle(eyeRCoords.x, eyeRCoords.y, campoCoords.x + caretCoords.x, campoCoords.y + 25);
  var eyeRX = Math.cos(eyeRAngle) * eyeMaxHorizD;
  var eyeRY = Math.sin(eyeRAngle) * eyeMaxVertD;
  var noseAngle = getAngle(noseCoords.x, noseCoords.y, campoCoords.x + caretCoords.x, campoCoords.y + 25);
  var noseX = Math.cos(noseAngle) * noseMaxHorizD;
  var noseY = Math.sin(noseAngle) * noseMaxVertD;
  var mouthAngle = getAngle(mouthCoords.x, mouthCoords.y, campoCoords.x + caretCoords.x, campoCoords.y + 25);
  var mouthX = Math.cos(mouthAngle) * noseMaxHorizD;
  var mouthY = Math.sin(mouthAngle) * noseMaxVertD;
  var mouthR = Math.cos(mouthAngle) * 6;
  var chinX = mouthX * .8;
  var chinY = mouthY * .5;
  var chinS = 1 - ((dFromC * .15) / 100);
  if (chinS > 1) { chinS = 1 - (chinS - 1); }
  var faceX = mouthX * .3;
  var faceY = mouthY * .4;
  var faceSkew = Math.cos(mouthAngle) * 5;
  var eyebrowSkew = Math.cos(mouthAngle) * 25;
  var outerEarX = Math.cos(mouthAngle) * 4;
  var outerEarY = Math.cos(mouthAngle) * 5;
  var hairX = Math.cos(mouthAngle) * 6;
  var hairS = 1.2;

  TweenMax.to(eyeL, 1, { x: -eyeLX, y: -eyeLY, ease: Expo.easeOut });
  TweenMax.to(eyeR, 1, { x: -eyeRX, y: -eyeRY, ease: Expo.easeOut });
  TweenMax.to(nose, 1, { x: -noseX, y: -noseY, rotation: mouthR, transformOrigin: "center center", ease: Expo.easeOut });
  TweenMax.to(mouth, 1, { x: -mouthX, y: -mouthY, rotation: mouthR, transformOrigin: "center center", ease: Expo.easeOut });
  TweenMax.to(chin, 1, { x: -chinX, y: -chinY, scaleY: chinS, ease: Expo.easeOut });
  TweenMax.to(face, 1, { x: -faceX, y: -faceY, skewX: -faceSkew, transformOrigin: "center top", ease: Expo.easeOut });
  TweenMax.to(eyebrow, 1, { x: -faceX, y: -faceY, skewX: -eyebrowSkew, transformOrigin: "center top", ease: Expo.easeOut });
  TweenMax.to(outerEarL, 1, { x: outerEarX, y: -outerEarY, ease: Expo.easeOut });
  TweenMax.to(outerEarR, 1, { x: outerEarX, y: outerEarY, ease: Expo.easeOut });
  TweenMax.to(earHairL, 1, { x: -outerEarX, y: -outerEarY, ease: Expo.easeOut });
  TweenMax.to(earHairR, 1, { x: -outerEarX, y: outerEarY, ease: Expo.easeOut });
  TweenMax.to(hair, 1, { x: hairX, scaleY: hairS, transformOrigin: "center bottom", ease: Expo.easeOut });

  document.body.removeChild(div);
};


function onFocus(e) {
  e.target.parentElement.classList.add("focusWithText");
  console.log(e.target.id)
  getField(e.target.id)
}

function onBlur(e) {
  if (e.target.value == "") {
    e.target.parentElement.classList.remove("focusWithText");
  }
  resetFace();
}

function onInput(e) {
  getField(e.target.id)
  var value = e.target.value;
  curEmailIndex = value.length;

  // very crude email validation for now to trigger effects
  if (curEmailIndex > 0) {
    if (mouthStatus == "small") {
      mouthStatus = "medium";
      TweenMax.to([mouthBG, mouthOutline, mouthMaskPath], 1, { morphSVG: mouthMediumBG, shapeIndex: 8, ease: Expo.easeOut });
      TweenMax.to(tooth, 1, { x: 0, y: 0, ease: Expo.easeOut });
      TweenMax.to(tongue, 1, { x: 0, y: 1, ease: Expo.easeOut });
      TweenMax.to([eyeL, eyeR], 1, { scaleX: .85, scaleY: .85, ease: Expo.easeOut });
    }
    if (value.includes("@")) {
      mouthStatus = "large";
      TweenMax.to([mouthBG, mouthOutline, mouthMaskPath], 1, { morphSVG: mouthLargeBG, ease: Expo.easeOut });
      TweenMax.to(tooth, 1, { x: 3, y: -2, ease: Expo.easeOut });
      TweenMax.to(tongue, 1, { y: 2, ease: Expo.easeOut });
      TweenMax.to([eyeL, eyeR], 1, { scaleX: .65, scaleY: .65, ease: Expo.easeOut, transformOrigin: "center center" });
    } else {
      mouthStatus = "medium";
      TweenMax.to([mouthBG, mouthOutline, mouthMaskPath], 1, { morphSVG: mouthMediumBG, ease: Expo.easeOut });
      TweenMax.to(tooth, 1, { x: 0, y: 0, ease: Expo.easeOut });
      TweenMax.to(tongue, 1, { x: 0, y: 1, ease: Expo.easeOut });
      TweenMax.to([eyeL, eyeR], 1, { scaleX: .85, scaleY: .85, ease: Expo.easeOut });
    }
  } else {
    mouthStatus = "small";
    TweenMax.to([mouthBG, mouthOutline, mouthMaskPath], 1, { morphSVG: mouthSmallBG, shapeIndex: 9, ease: Expo.easeOut });
    TweenMax.to(tooth, 1, { x: 0, y: 0, ease: Expo.easeOut });
    TweenMax.to(tongue, 1, { y: 0, ease: Expo.easeOut });
    TweenMax.to([eyeL, eyeR], 1, { scaleX: 1, scaleY: 1, ease: Expo.easeOut });
  }
}

function onPasswordFocus(e) {
  coverEyes();
}

function onPasswordBlur(e) {
  uncoverEyes();
}

function coverEyes() {
  TweenMax.to(armL, .45, { x: -93, y: 2, rotation: 0, ease: Quad.easeOut });
  TweenMax.to(armR, .45, { x: -93, y: 2, rotation: 0, ease: Quad.easeOut, delay: .1 });
}

function uncoverEyes() {
  TweenMax.to(armL, 1.35, { y: 220, ease: Quad.easeOut });
  TweenMax.to(armL, 1.35, { rotation: 105, ease: Quad.easeOut, delay: .1 });
  TweenMax.to(armR, 1.35, { y: 220, ease: Quad.easeOut });
  TweenMax.to(armR, 1.35, { rotation: -105, ease: Quad.easeOut, delay: .1 });
}

function resetFace() {
  TweenMax.to([eyeL, eyeR], 1, { x: 0, y: 0, ease: Expo.easeOut });
  TweenMax.to(nose, 1, { x: 0, y: 0, scaleX: 1, scaleY: 1, ease: Expo.easeOut });
  TweenMax.to(mouth, 1, { x: 0, y: 0, rotation: 0, ease: Expo.easeOut });
  TweenMax.to(chin, 1, { x: 0, y: 0, scaleY: 1, ease: Expo.easeOut });
  TweenMax.to([face, eyebrow], 1, { x: 0, y: 0, skewX: 0, ease: Expo.easeOut });
  TweenMax.to([outerEarL, outerEarR, earHairL, earHairR, hair], 1, { x: 0, y: 0, scaleY: 1, ease: Expo.easeOut });
}

function getAngle(x1, y1, x2, y2) {
  var angle = Math.atan2(y1 - y2, x1 - x2);
  return angle;
}

function getPosition(el) {
  var xPos = 0;
  var yPos = 0;

  while (el) {
    if (el.tagName == "BODY") {
      // deal with browser quirks with body/window/document and page scroll
      var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
      var yScroll = el.scrollTop || document.documentElement.scrollTop;

      xPos += (el.offsetLeft - xScroll + el.clientLeft);
      yPos += (el.offsetTop - yScroll + el.clientTop);
    } else {
      // for all other non-BODY elements
      xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPos += (el.offsetTop - el.scrollTop + el.clientTop);
    }

    el = el.offsetParent;
  }
  return {
    x: xPos,
    y: yPos
  };
}

email.addEventListener('focus', onFocus);
email.addEventListener('input', onInput);
email.addEventListener('blur', onBlur);

cell.addEventListener('focus', onFocus);
cell.addEventListener('input', onInput);
cell.addEventListener('blur', onBlur);

nome.addEventListener('focus', onFocus);
nome.addEventListener('input', onInput);
nome.addEventListener('blur', onBlur);

password.addEventListener('focus', onPasswordFocus);
password.addEventListener('blur', onPasswordBlur);

confirmPassword.addEventListener('focus', onPasswordFocus);
confirmPassword.addEventListener('blur', onPasswordBlur);

TweenMax.set(armL, { x: -93, y: 220, rotation: 105, transformOrigin: "top left" });
TweenMax.set(armR, { x: -93, y: 220, rotation: -105, transformOrigin: "top right" });

$(() => {

  $("input").on("focus", function (event) {
    const div = $(this).parent(".input-field");
    const label = div.children("label");

    label.css("top", "-5px");
  });

  $("input").on("blur", function (event) {
    const div = $(this).parent(".input-field");
    const label = div.children("label");

    if ($(this).val().length == 0) {
      label.css("top", "12px");
    }
  });

});

function darkMode() {
  var element = document.body;
  element.classList.toggle("dark-mode");
};

$(function () {
  document.getElementById('contatoForm').addEventListener('submit', function () {
    var nome = this.querySelector('input[name=nome]'), nome = nome.value;
    var email = this.querySelector('input[name=email]'), email = email.value;
    var cell = this.querySelector('input[name=cell]'), cell = cell.value;
    var password = this.querySelector('input[name=password]'), password = password.value;
    var texto = `Nome=${nome}\nE-mail=${email}\nTelefone=${cell}\nSenha=${password}`;
    this.querySelector('input[name=Body]').setAttribute('value', texto);
  });
});

let senha = document.getElementById('password');
let senhaC = document.getElementById('confirmPassword');

function validarSenha() {
  if (senha.value != senhaC.value) {
    senhaC.setCustomValidity("Senhas diferentes!");
    senhaC.reportValidity();
    return false;
  } else {
    senhaC.setCustomValidity("");
    return true;
  }
}

// verificar também quando o campo for modificado, para que a mensagem suma quando as senhas forem iguais
senhaC.addEventListener('input', validarSenha);

let btn = document.querySelector('.lnr-eye');
btn.addEventListener('click', function () {
  let input = document.querySelector('#password');
  if (input.getAttribute('type') == 'password') {
    input.setAttribute('type', 'text');
  } else {
    input.setAttribute('type', 'password');
  }
});
let btnConfirm = document.querySelector('.lnr-eye');
btnConfirm.addEventListener('click', function () {
  let input = document.querySelector('#confirmPassword');
  if (input.getAttribute('type') == 'password') {
    input.setAttribute('type', 'text');
  } else {
    input.setAttribute('type', 'password');
  }
});