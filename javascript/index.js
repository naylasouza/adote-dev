const recuperarDados = (nomejson, idcontainer) => {
    // precisou colocar o return pq o slick nao estava funcionando duas vezes.
    return fetch(nomejson)
        .then((response) => { return response.json() })
        .then((dadosjson) => {

            const htmlCard = dadosjson.dados.reduce((acumulador, { nome, habilidades, foto_url }) => {
                acumulador += `
                    <div class="card">
                        <img class="card-img-top" src="${foto_url}" alt="Imagem de capa do card">
                        <div class="card-body">
                            <h5 class="card-title">${nome}</h5>
                            <p class="card-text">${habilidades.join(" e ")}</p>
                            
                        </div>
                    </div>
                    `

                return acumulador;
            }, '')

            const meuscardscarrossel = document.getElementById(idcontainer);

            meuscardscarrossel.innerHTML = htmlCard;
        })
}
recuperarDados('./javascript/dados/lista_mentorados.json', 'containermentorados')
    .then(() => {
        return recuperarDados('./javascript/dados/lista_mentor.json', 'containermentor')

    })
    .then(() => {
        $('.carrossel_container').slick({
            slidesToShow: 4,
            slidesToScroll: 4,
            dots: true,
        });
    })