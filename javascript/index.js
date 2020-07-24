const recuperarDados = (nomejson, idcontainer) => {
    // precisou colocar o return pq o slick nao estava funcionando duas vezes.
    return fetch(nomejson)
        .then((response) => { return response.json() })
        .then((dadosjson) => {

            const htmlCard = dadosjson.dados.reduce((acumulador, { nome, habilidades, foto_url, github, twitter, linkedin }) => {
                acumulador += `
                    <div class="card">
                        <img class="card-img-top" src="${foto_url}" alt="Imagem de capa do card">
                        <div class="card-body">
                            <h5 class="card-title">${nome}</h5>
                            <p class="card-text">${habilidades.join(" e ")}</p>
                            <ul class="card-redes">
                                <li>
                                    <a target="_blank" class="rede_pessoal" href="${linkedin}" alt="Icone linkedin">
                                        <i class="fab fa-linkedin-in"></i>
                                    </a>
                                </li>
                                <li>
                                    <a target="_blank" class="rede_pessoal" href="${twitter}" alt="Icone twitter">
                                        <i class="fab fa-twitter"></i>
                                    </a>
                                </li>
                                <li>
                                    <a target="_blank" class="rede_pessoal" href="${github}" alt="Icone github">
                                        <i class="fab fa-github-alt"></i>
                                    </a>
                                </li>
                            </ul>
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
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    })