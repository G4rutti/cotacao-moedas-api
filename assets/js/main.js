const resultado = document.querySelector("#resultado")
const cedulaImage = document.getElementById('image')
const code = document.querySelector("#Conversor")
const codein = document.querySelector("#Converter")



const fetchCotacoes = async(conversor, converter) => {
    if(conversor == converter){
        resultado.innerHTML = "Não pode ter valores iguais!"
    }else{
        const APIResponse = await fetch(`https://economia.awesomeapi.com.br/json/last/${conversor}-${converter}`)
        if(APIResponse.status === 200){
            const data = await APIResponse.json()
            return data
        }else{
            console.log("Algo deu errado")
        }
    } 
}

const renderConverter = async(conversor = code.value, converter = codein.value) => {
    const textCode = code.options[code.selectedIndex].text;
    const textCodein = codein.options[codein.selectedIndex].text;
    resultado.innerHTML = "Carregando..."
    cedulaImage.src = "assets/img/loading-buffering.gif"
    const data = await fetchCotacoes(conversor, converter)
    if(data){
        const price = data[conversor+converter]['bid']
        resultado.innerHTML = "1 " + textCode+ " equivale a " + price + " " + textCodein 
        if(textCode == 'Euro'){
            console.log('oi')
            cedulaImage.src = "assets/img/euro.gif"
        }else if(textCode == 'Real'){
            cedulaImage.src = "assets/img/real.gif"
        }else if(textCode == 'Bitcoin'){
            cedulaImage.src = "assets/img/btc.gif"
        }else{
            cedulaImage.src = "assets/img/dolar.gif"
        }
    }

}
