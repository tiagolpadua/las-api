function obterDescontoTotal(categoria, cupom) {
    switch (categoria) {
        case 'Alimetação':
            if (cupom === 'NULABSSA' || cupom === 'ALURANU') {
                return 40
            } else if (cupom === 'CUPOM-INVALIDO') {
                return 30
            }
        case 'Infantil':
            if (cupom === 'ALURANU') {
                return 25
            }

        case 'Bebida':
            if (cupom === 'ALURANU') {
                return 10
            }
        default:
            return 0
    }
}

console.log(obterDescontoTotal('Alimetação','CUPOM-INVALIDO'))

