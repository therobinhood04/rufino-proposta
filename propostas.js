/* =====================================================================
   PROPOSTAS PERSONALIZADAS · uma entrada por barbearia
   Acesso: /?proposta=<chave>   (ex.: /?proposta=rocha-barbeiro)

   Origem dos dados abaixo: levantamento público no Google Maps feito em
   14/11/2026 (nome, cidade, bairro, nota e nº de avaliações). Nada além
   disso é conhecido: proprietário, logotipo e fotos ficam null até serem
   informados pela própria barbearia. Nunca preencha com suposições.

   Campos opcionais por proposta:
     proprietario: 'Nome'            saudação personalizada
     logo: 'img/clientes/x.svg'      logotipo autorizado pela barbearia
     capa: { jpg, webp, alt }        foto autorizada para a abertura
     planoSugerido: 'site' | 'combo' plano pré-selecionado
     validade: 'AAAA-MM-DD'          validade da condição BlackRufino para este cliente
     observacao: 'texto curto'       nota exibida na abertura
   ===================================================================== */
window.RUFINO_PROPOSTAS = {
  levantamento: '2026-11-14',
  itens: {
    "rocha-barbeiro": {
      "nome": "Rocha Barbeiro",
      "cidade": "Fortaleza",
      "bairro": "Messejana",
      "google": {
        "nota": 5.0,
        "avaliacoes": 1629
      }
    },
    "seu-elizes-barbershop": {
      "nome": "Seu Elizes Barbershop",
      "cidade": "Eusébio",
      "bairro": "Centro",
      "google": {
        "nota": 4.8,
        "avaliacoes": 812
      }
    },
    "marlon-experience": {
      "nome": "Marlon Experience",
      "cidade": "Eusébio",
      "bairro": "Centro",
      "google": {
        "nota": 5.0,
        "avaliacoes": 688
      }
    },
    "savio-barbearia": {
      "nome": "Sávio Barbearia",
      "cidade": "Fortaleza",
      "bairro": "Messejana",
      "google": {
        "nota": 5.0,
        "avaliacoes": 454
      }
    },
    "barbearia-vitinho": {
      "nome": "Barbearia Vitinho",
      "cidade": "Caucaia",
      "bairro": "Curicaca",
      "google": {
        "nota": 5.0,
        "avaliacoes": 433
      }
    },
    "black-razor-barbearia-e-tattoo": {
      "nome": "Black Razor Barbearia e Tattoo",
      "cidade": "Fortaleza",
      "bairro": "Conjunto Ceará",
      "google": {
        "nota": 5.0,
        "avaliacoes": 421
      }
    },
    "barbearia-vangard": {
      "nome": "Barbearia Vangard",
      "cidade": "Eusébio",
      "bairro": "Coité",
      "google": {
        "nota": 5.0,
        "avaliacoes": 376
      }
    },
    "barbearia-ferreira": {
      "nome": "Barbearia Ferreira",
      "cidade": "Caucaia",
      "bairro": "Itambé",
      "google": {
        "nota": 4.9,
        "avaliacoes": 325
      }
    },
    "mr-x-complexo": {
      "nome": "Mr. X Complexo",
      "cidade": "Fortaleza",
      "bairro": "Montese",
      "google": {
        "nota": 5.0,
        "avaliacoes": 292
      }
    },
    "barbearia-o-vieira": {
      "nome": "Barbearia O Vieira",
      "cidade": "Eusébio",
      "bairro": "Mangabeira",
      "google": {
        "nota": 5.0,
        "avaliacoes": 287
      }
    },
    "barber-in-barbearia": {
      "nome": "Barber'In Barbearia",
      "cidade": "Fortaleza",
      "bairro": "Meireles",
      "google": {
        "nota": 5.0,
        "avaliacoes": 286
      }
    },
    "barbearia-keven-allan": {
      "nome": "Barbearia Keven Allan",
      "cidade": "Caucaia",
      "bairro": "Parque Soledade",
      "google": {
        "nota": 4.9,
        "avaliacoes": 286
      }
    },
    "green-s-barbershop": {
      "nome": "Green's Barbershop",
      "cidade": "Fortaleza",
      "bairro": "Aldeota",
      "google": {
        "nota": 4.9,
        "avaliacoes": 285
      }
    },
    "barbearia-sr-bessa": {
      "nome": "Barbearia Sr. Bessa",
      "cidade": "Fortaleza",
      "bairro": "Messejana",
      "google": {
        "nota": 4.9,
        "avaliacoes": 266
      }
    },
    "barbearia-mov": {
      "nome": "Barbearia MOV",
      "cidade": "Maranguape",
      "bairro": "Centro",
      "google": {
        "nota": 4.9,
        "avaliacoes": 264
      }
    },
    "sb-club-barbearia": {
      "nome": "SB Club Barbearia",
      "cidade": "Fortaleza",
      "bairro": "Conjunto Ceará",
      "google": {
        "nota": 4.9,
        "avaliacoes": 245
      }
    },
    "torres-barbearia": {
      "nome": "Torres Barbearia",
      "cidade": "Fortaleza",
      "bairro": "José Walter",
      "google": {
        "nota": 5.0,
        "avaliacoes": 238
      }
    },
    "barbearia-jocelio-diogenes": {
      "nome": "Barbearia Jocélio Diógenes",
      "cidade": "Maracanaú",
      "bairro": "Jereissati",
      "google": {
        "nota": 5.0,
        "avaliacoes": 219
      }
    },
    "los-primos-barbeiros": {
      "nome": "Los Primos Barbeiros",
      "cidade": "Fortaleza",
      "bairro": "Messejana",
      "google": {
        "nota": 4.9,
        "avaliacoes": 216
      }
    },
    "k-barbearia": {
      "nome": "K Barbearia",
      "cidade": "Maracanaú",
      "bairro": "Novo Oriente",
      "google": {
        "nota": 5.0,
        "avaliacoes": 209
      }
    },
    "don-xico-barbearia": {
      "nome": "Don Xico Barbearia",
      "cidade": "Fortaleza",
      "bairro": "Vila Peri",
      "google": {
        "nota": 5.0,
        "avaliacoes": 208
      }
    },
    "ficus-barbearia": {
      "nome": "Ficus Barbearia",
      "cidade": "Fortaleza",
      "bairro": "Conjunto Ceará",
      "google": {
        "nota": 5.0,
        "avaliacoes": 202
      }
    },
    "raboni-barbearia": {
      "nome": "Raboni Barbearia",
      "cidade": "Maracanaú",
      "bairro": "Jereissati",
      "google": {
        "nota": 5.0,
        "avaliacoes": 183
      }
    },
    "sandro-barbearia": {
      "nome": "Sandro Barbearia",
      "cidade": "Fortaleza",
      "bairro": "Cambeba",
      "google": {
        "nota": 4.9,
        "avaliacoes": 156
      }
    },
    "barbearia-do-thi": {
      "nome": "Barbearia do Thi",
      "cidade": "Fortaleza",
      "bairro": "Montese",
      "google": {
        "nota": 5.0,
        "avaliacoes": 155
      }
    },
    "alves-barbearia": {
      "nome": "Alves Barbearia",
      "cidade": "Caucaia",
      "bairro": "Padre Romualdo",
      "google": {
        "nota": 5.0,
        "avaliacoes": 154
      }
    },
    "clube-50-barbearia": {
      "nome": "Clube 50 Barbearia",
      "cidade": "Fortaleza",
      "bairro": "José Walter",
      "google": {
        "nota": 4.9,
        "avaliacoes": 150
      }
    },
    "lima-s-barbearia": {
      "nome": "Lima's Barbearia",
      "cidade": "Fortaleza",
      "bairro": "Messejana",
      "google": {
        "nota": 5.0,
        "avaliacoes": 145
      }
    },
    "aquino-barbearia": {
      "nome": "Aquino Barbearia",
      "cidade": "Fortaleza",
      "bairro": "José Walter",
      "google": {
        "nota": 5.0,
        "avaliacoes": 135
      }
    },
    "barbearia-visul-barber": {
      "nome": "Barbearia Visul Barber",
      "cidade": "Fortaleza",
      "bairro": "Parangaba",
      "google": {
        "nota": 4.8,
        "avaliacoes": 120
      }
    },
    "barbearia-cabra-da-peste": {
      "nome": "Barbearia Cabra da Peste",
      "cidade": "Fortaleza",
      "bairro": "Cambeba",
      "google": {
        "nota": 4.8,
        "avaliacoes": 117
      }
    },
    "hoffmans-barber-shop": {
      "nome": "Hoffmans Barber Shop",
      "cidade": "Fortaleza",
      "bairro": "José Walter",
      "google": {
        "nota": 5.0,
        "avaliacoes": 117
      }
    },
    "elvis-barbearia": {
      "nome": "Elvis Barbearia",
      "cidade": "Pacatuba",
      "bairro": "Jereissati II",
      "google": {
        "nota": 5.0,
        "avaliacoes": 109
      }
    },
    "pessoa-barbearia": {
      "nome": "Pessôa Barbearia",
      "cidade": "Maranguape",
      "bairro": "Aldeoma",
      "google": {
        "nota": 5.0,
        "avaliacoes": 101
      }
    },
    "authentic-men-barbearia": {
      "nome": "Authentic Men Barbearia",
      "cidade": "Maracanaú",
      "bairro": "Residencial",
      "google": {
        "nota": 5.0,
        "avaliacoes": 98
      }
    },
    "delta-barbearia-aldeota": {
      "nome": "Delta - Barbearia Aldeota",
      "cidade": "Fortaleza",
      "bairro": "Aldeota",
      "google": {
        "nota": 5.0,
        "avaliacoes": 86
      }
    },
    "vipbarbershop": {
      "nome": "VipBarberShop",
      "cidade": "Fortaleza",
      "bairro": "Aldeota",
      "google": {
        "nota": 5.0,
        "avaliacoes": 83
      }
    },
    "benevides-barbershop": {
      "nome": "Benevides Barbershop",
      "cidade": "Fortaleza",
      "bairro": "Montese",
      "google": {
        "nota": 5.0,
        "avaliacoes": 83
      }
    },
    "lh-club-barbearia": {
      "nome": "LH Club Barbearia",
      "cidade": "Fortaleza",
      "bairro": "Cambeba",
      "google": {
        "nota": 5.0,
        "avaliacoes": 80
      }
    },
    "master-barbearia": {
      "nome": "Master Barbearia",
      "cidade": "Fortaleza",
      "bairro": "José Walter",
      "google": {
        "nota": 4.9,
        "avaliacoes": 77
      }
    },
    "barbearia-o-pedro": {
      "nome": "Barbearia O Pedro",
      "cidade": "Maranguape",
      "bairro": "Coité",
      "google": {
        "nota": 5.0,
        "avaliacoes": 59
      }
    },
    "goat-barber": {
      "nome": "Goat Barber",
      "cidade": "Fortaleza",
      "bairro": "Conjunto Ceará",
      "google": {
        "nota": 5.0,
        "avaliacoes": 55
      }
    },
    "ws-barbearia": {
      "nome": "WS Barbearia",
      "cidade": "Fortaleza",
      "bairro": "Meireles",
      "google": {
        "nota": 4.9,
        "avaliacoes": 53
      }
    },
    "sr-nunes-barbearia": {
      "nome": "Sr. Nunes Barbearia",
      "cidade": "Fortaleza",
      "bairro": "Parangaba",
      "google": {
        "nota": 5.0,
        "avaliacoes": 50
      }
    },
    "barbearia-aldeota": {
      "nome": "Barbearia Aldeota",
      "cidade": "Fortaleza",
      "bairro": "Aldeota",
      "google": {
        "nota": 5.0,
        "avaliacoes": 40
      }
    },
    "sr-russo-barbearia": {
      "nome": "Sr. Russo Barbearia",
      "cidade": "Fortaleza",
      "bairro": "Parangaba",
      "google": {
        "nota": 5.0,
        "avaliacoes": 38
      }
    },
    "sete65-barbershop": {
      "nome": "Sete65 Barbershop",
      "cidade": "Fortaleza",
      "bairro": "Conjunto Ceará",
      "google": {
        "nota": 5.0,
        "avaliacoes": 38
      }
    },
    "barber-shop-salomao": {
      "nome": "Barber Shop Salomão",
      "cidade": "Maranguape",
      "bairro": "Outra Banda",
      "google": {
        "nota": 4.8,
        "avaliacoes": 33
      }
    },
    "nobre-barber": {
      "nome": "Nobre Barber",
      "cidade": "Fortaleza",
      "bairro": "Parangaba",
      "google": {
        "nota": 5.0,
        "avaliacoes": 24
      }
    },
    "barbearia-costa-e-silva": {
      "nome": "Barbearia Costa e Silva",
      "cidade": "Pacatuba",
      "bairro": "Jereissati III",
      "google": {
        "nota": 5.0,
        "avaliacoes": 21
      }
    },
    "ze-barbeiro": {
      "nome": "Zé Barbeiro",
      "cidade": "Fortaleza",
      "bairro": "Aldeota",
      "google": {
        "nota": 5.0,
        "avaliacoes": 1512
      }
    },
    "oss-barbeiros-meireles": {
      "nome": "OSS Barbeiros Meireles",
      "cidade": "Fortaleza",
      "bairro": "Meireles",
      "google": {
        "nota": 4.9,
        "avaliacoes": 334
      }
    },
    "oss-barbeiros-cambeba": {
      "nome": "OSS Barbeiros Cambeba",
      "cidade": "Fortaleza",
      "bairro": "Cambeba",
      "google": {
        "nota": 4.9,
        "avaliacoes": 61
      }
    },
    "baker-street-barbearia": {
      "nome": "Baker Street Barbearia",
      "cidade": "Fortaleza",
      "bairro": "Cambeba",
      "google": {
        "nota": 4.9,
        "avaliacoes": 447
      }
    },
    "the-barber-exclusive": {
      "nome": "The Barber Exclusive",
      "cidade": "Fortaleza",
      "bairro": "Meireles",
      "google": {
        "nota": 4.9,
        "avaliacoes": 325
      }
    },
    "barbearia-barba-de-ferro": {
      "nome": "Barbearia Barba de Ferro",
      "cidade": "Fortaleza",
      "bairro": "Montese",
      "google": {
        "nota": 5.0,
        "avaliacoes": 227
      }
    },
    "brooklyn-barbearia": {
      "nome": "Brooklyn Barbearia",
      "cidade": "Fortaleza",
      "bairro": "Meireles",
      "google": {
        "nota": 4.7,
        "avaliacoes": 159
      }
    },
    "sr-barbeiro-eusebio": {
      "nome": "Sr. Barbeiro Eusébio",
      "cidade": "Eusébio",
      "bairro": "Centro",
      "google": {
        "nota": 4.9,
        "avaliacoes": 159
      }
    }
  }
};
