function atualizarSanfona(mensagem){
  const acc = document.querySelector(".accordion");
  acc.disabled = false;
  acc.textContent = mensagem;
  
  acc.classList.toggle("active");

  const panel = acc.nextElementSibling;
  panel.style.maxHeight = (panel.style.maxHeight ? null : panel.scrollHeight + "px");

  acc.disabled = true;  
}

export function abrirSanfona(){
  const acc = document.querySelector(".accordion");
  if(!acc.classList.contains("active")){
    acc.nextElementSibling.classList.remove("fechaSanfona");
    acc.nextElementSibling.classList.add("abreSanfona");
    atualizarSanfona('O seu personagem é...');
  }
    
}

export function fecharSanfona(){
  const acc = document.querySelector(".accordion");
  if(acc.classList.contains("active")){
    acc.nextElementSibling.classList.remove("abreSanfona");
    acc.nextElementSibling.classList.add("fechaSanfona");    
    atualizarSanfona('Complete a ficha e descubra o perfil do seu personagem.');
  }
}

export function mostrarPerfil(caminhoImagem, textoPerfil){
  const imagemPerfil = document.querySelector("#perfil");
  const descricaoPerfil = document.querySelector("#desc_perfil");  
  
  imagemPerfil.setAttribute("src", caminhoImagem);
  imagemPerfil.classList.remove("fadeOut", "invisivel");
  imagemPerfil.classList.add("slowFadeIn"); 
  
  descricaoPerfil.textContent = textoPerfil;        
  descricaoPerfil.classList.remove("fadeOut", "invisivel");
  descricaoPerfil.classList.add("slowFadeIn");    
};

export function esconderPerfil(){  
  const imagemPerfil = document.querySelector("#perfil");
  const descricaoPerfil = document.querySelector("#desc_perfil");  
  
  imagemPerfil.setAttribute("src", "");
  imagemPerfil.classList.remove("slowFadeIn");
  imagemPerfil.classList.add("invisivel", "fadeOut");
      
  descricaoPerfil.textContent = ""; 
  descricaoPerfil.classList.remove("slowFadeIn");       
  descricaoPerfil.classList.add("invisivel", "fadeOut");
}