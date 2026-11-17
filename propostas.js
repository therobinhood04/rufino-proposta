/* =====================================================================
   PROPOSTAS PERSONALIZADAS · uma entrada por barbearia
   Acesso: /?proposta=<chave>   (ex.: /?proposta=rocha-barbeiro)

   Origem dos dados abaixo: levantamento público no Google Maps feito em
   14/11/2026 (Fortaleza) e 17/11/2026 (demais cidades, campo levantamento
   por item): nome, cidade, bairro, nota e nº de avaliações. Nada além
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
    },
    "barbearia-cheval": {
      "nome": "Barbearia Cheval",
      "cidade": "Recife - PE",
      "bairro": "Madalena",
      "google": {
        "nota": 5,
        "avaliacoes": 310
      },
      "levantamento": "2026-11-17"
    },
    "barbearia-dom-barbudo-barber-club": {
      "nome": "Barbearia Dom Barbudo Barber Club",
      "cidade": "Salvador - BA",
      "bairro": "Caminho das Árvores",
      "google": {
        "nota": 5,
        "avaliacoes": 1548
      },
      "levantamento": "2026-11-17"
    },
    "pituba-barbershop": {
      "nome": "Pituba Barbershop",
      "cidade": "Salvador - BA",
      "bairro": "Pituba",
      "google": {
        "nota": 4.9,
        "avaliacoes": 301
      },
      "levantamento": "2026-11-17"
    },
    "farol-beach-barbershop": {
      "nome": "Farol Beach BarberShop",
      "cidade": "Salvador - BA",
      "bairro": "Barra",
      "google": {
        "nota": 5,
        "avaliacoes": 609
      },
      "levantamento": "2026-11-17"
    },
    "lucas-gabriel-barbershop": {
      "nome": "Lucas Gabriel Barbershop",
      "cidade": "Natal - RN",
      "bairro": "Dix-Sept Rosado",
      "google": {
        "nota": 5,
        "avaliacoes": 644
      },
      "levantamento": "2026-11-17"
    },
    "alpha-barber-shop": {
      "nome": "Alpha Barber Shop",
      "cidade": "João Pessoa - PB",
      "bairro": "Cabo Branco",
      "google": {
        "nota": 5,
        "avaliacoes": 1680
      },
      "levantamento": "2026-11-17"
    },
    "barbearia-mr-jesus": {
      "nome": "Barbearia Mr. Jésus",
      "cidade": "João Pessoa - PB",
      "bairro": "Cabo Branco",
      "google": {
        "nota": 4.9,
        "avaliacoes": 414
      },
      "levantamento": "2026-11-17"
    },
    "barbearia-velha-guarda": {
      "nome": "Barbearia Velha Guarda",
      "cidade": "Maceió - AL",
      "bairro": "Mangabeiras",
      "google": {
        "nota": 5,
        "avaliacoes": 1350
      },
      "levantamento": "2026-11-17"
    },
    "barong-barbearia": {
      "nome": "Barong Barbearia",
      "cidade": "Maceió - AL",
      "bairro": "Jatiúca",
      "google": {
        "nota": 5,
        "avaliacoes": 574
      },
      "levantamento": "2026-11-17"
    },
    "barbearia-alagoana": {
      "nome": "Barbearia Alagoana",
      "cidade": "Maceió - AL",
      "bairro": "Farol",
      "google": {
        "nota": 4.9,
        "avaliacoes": 452
      },
      "levantamento": "2026-11-17"
    },
    "the-master-barber": {
      "nome": "The Master Barber",
      "cidade": "Aracaju - SE",
      "bairro": "Jardins",
      "google": {
        "nota": 4.8,
        "avaliacoes": 1318
      },
      "levantamento": "2026-11-17"
    },
    "pai-e-filho-barbearia": {
      "nome": "Pai e Filho Barbearia",
      "cidade": "Aracaju - SE",
      "bairro": "Farolândia",
      "google": {
        "nota": 5,
        "avaliacoes": 946
      },
      "levantamento": "2026-11-17"
    },
    "relax-barbearia-teresina": {
      "nome": "Relax Barbearia Teresina",
      "cidade": "Teresina - PI",
      "bairro": "Jóquei",
      "google": {
        "nota": 5,
        "avaliacoes": 2215
      },
      "levantamento": "2026-11-17"
    },
    "bozzi-barbearia": {
      "nome": "Bozzi Barbearia",
      "cidade": "Teresina - PI",
      "bairro": "Fátima",
      "google": {
        "nota": 5,
        "avaliacoes": 669
      },
      "levantamento": "2026-11-17"
    },
    "hollywood-barbershop": {
      "nome": "Hollywood Barbershop",
      "cidade": "Teresina - PI",
      "bairro": "Memorare",
      "google": {
        "nota": 5,
        "avaliacoes": 324
      },
      "levantamento": "2026-11-17"
    },
    "barba-negra-barbearia": {
      "nome": "Barba Negra Barbearia",
      "cidade": "Teresina - PI",
      "bairro": "Morada do Sol",
      "google": {
        "nota": 4.9,
        "avaliacoes": 482
      },
      "levantamento": "2026-11-17"
    },
    "barbearia-brooklin-slz": {
      "nome": "Barbearia Brooklin SLZ",
      "cidade": "São Luís - MA",
      "bairro": "Cantinho do Céu",
      "google": {
        "nota": 4.8,
        "avaliacoes": 253
      },
      "levantamento": "2026-11-17"
    },
    "sparta-barber-shop": {
      "nome": "Sparta Barber Shop",
      "cidade": "São Luís - MA",
      "bairro": "Bequimão",
      "google": {
        "nota": 4.9,
        "avaliacoes": 210
      },
      "levantamento": "2026-11-17"
    },
    "barbearia-chicago-belem": {
      "nome": "Barbearia Chicago Belém",
      "cidade": "Belém - PA",
      "bairro": "Nazaré",
      "google": {
        "nota": 4.9,
        "avaliacoes": 1260
      },
      "levantamento": "2026-11-17"
    },
    "t9-barber-xperience": {
      "nome": "t9 Barber Xperience",
      "cidade": "Belém - PA",
      "bairro": "Marco",
      "google": {
        "nota": 5,
        "avaliacoes": 957
      },
      "levantamento": "2026-11-17"
    },
    "los-brutos-barbearia": {
      "nome": "Los'Brutos Barbearia",
      "cidade": "Belém - PA",
      "bairro": "Pedreira",
      "google": {
        "nota": 4.9,
        "avaliacoes": 565
      },
      "levantamento": "2026-11-17"
    },
    "barbearia-mr-alfa-umarizal": {
      "nome": "Barbearia Mr Alfa Umarizal",
      "cidade": "Belém - PA",
      "bairro": "Umarizal",
      "google": {
        "nota": 5,
        "avaliacoes": 994
      },
      "levantamento": "2026-11-17"
    },
    "barbearia-bianchinni": {
      "nome": "Barbearia Bianchinni",
      "cidade": "Manaus - AM",
      "bairro": "Adrianópolis",
      "google": {
        "nota": 4.9,
        "avaliacoes": 507
      },
      "levantamento": "2026-11-17"
    },
    "dario-s-barbershop": {
      "nome": "Dario's Barbershop",
      "cidade": "Manaus - AM",
      "bairro": "Chapada",
      "google": {
        "nota": 4.9,
        "avaliacoes": 420
      },
      "levantamento": "2026-11-17"
    },
    "los-muchachos-barbearia": {
      "nome": "Los Muchachos Barbearia",
      "cidade": "Manaus - AM",
      "bairro": "Novo Aleixo",
      "google": {
        "nota": 4.9,
        "avaliacoes": 256
      },
      "levantamento": "2026-11-17"
    },
    "barbearia-park-sul": {
      "nome": "Barbearia Park Sul",
      "cidade": "Brasília - DF",
      "bairro": "Guará",
      "google": {
        "nota": 5,
        "avaliacoes": 1110
      },
      "levantamento": "2026-11-17"
    },
    "mandril-barbearia-asa-norte": {
      "nome": "Mandril Barbearia Asa Norte",
      "cidade": "Brasília - DF",
      "bairro": "Asa Norte",
      "google": {
        "nota": 5,
        "avaliacoes": 447
      },
      "levantamento": "2026-11-17"
    },
    "oeste-barbearia": {
      "nome": "Oeste Barbearia",
      "cidade": "Goiânia - GO",
      "bairro": "Setor Oeste",
      "google": {
        "nota": 4.9,
        "avaliacoes": 614
      },
      "levantamento": "2026-11-17"
    },
    "lottus-barbearia-clube": {
      "nome": "Lottus Barbearia Clube",
      "cidade": "Goiânia - GO",
      "bairro": "Jardim América",
      "google": {
        "nota": 5,
        "avaliacoes": 889
      },
      "levantamento": "2026-11-17"
    },
    "hooligans-barbearia": {
      "nome": "Hooligans Barbearia",
      "cidade": "Cuiabá - MT",
      "bairro": "Araés",
      "google": {
        "nota": 5,
        "avaliacoes": 540
      },
      "levantamento": "2026-11-17"
    },
    "alvorada-barber-shop": {
      "nome": "Alvorada Barber Shop",
      "cidade": "Cuiabá - MT",
      "bairro": "Jardim Alvorada",
      "google": {
        "nota": 5,
        "avaliacoes": 1018
      },
      "levantamento": "2026-11-17"
    },
    "barbearia-juarez": {
      "nome": "Barbearia Juarez",
      "cidade": "Cuiabá - MT",
      "bairro": "Centro Norte",
      "google": {
        "nota": 4.8,
        "avaliacoes": 530
      },
      "levantamento": "2026-11-17"
    },
    "boleiros-barbearia": {
      "nome": "Boleiros Barbearia",
      "cidade": "Cuiabá - MT",
      "bairro": "Santa Isabel",
      "google": {
        "nota": 5,
        "avaliacoes": 869
      },
      "levantamento": "2026-11-17"
    },
    "creone-barbearia": {
      "nome": "Creone Barbearia",
      "cidade": "Cuiabá - MT",
      "bairro": "Grande Terceiro",
      "google": {
        "nota": 5,
        "avaliacoes": 516
      },
      "levantamento": "2026-11-17"
    },
    "zona-sul-barbearia": {
      "nome": "Zona Sul Barbearia",
      "cidade": "Campo Grande - MS",
      "bairro": "Vila Carlota",
      "google": {
        "nota": 5,
        "avaliacoes": 4079
      },
      "levantamento": "2026-11-17"
    },
    "barber-coffee": {
      "nome": "Barber Coffee",
      "cidade": "Campo Grande - MS",
      "bairro": "Centro",
      "google": {
        "nota": 5,
        "avaliacoes": 189
      },
      "levantamento": "2026-11-17"
    },
    "zacaro-barber-shop": {
      "nome": "Zacaro Barber Shop",
      "cidade": "Rio de Janeiro - RJ",
      "bairro": "Cachambi",
      "google": {
        "nota": 4.9,
        "avaliacoes": 619
      },
      "levantamento": "2026-11-17"
    },
    "moderna-barbershop": {
      "nome": "Moderna Barbershop",
      "cidade": "Rio de Janeiro - RJ",
      "bairro": "Vila da Penha",
      "google": {
        "nota": 5,
        "avaliacoes": 170
      },
      "levantamento": "2026-11-17"
    },
    "na-risca-barbershop": {
      "nome": "Na Risca Barbershop",
      "cidade": "Rio de Janeiro - RJ",
      "bairro": "Cordovil",
      "google": {
        "nota": 4.9,
        "avaliacoes": 292
      },
      "levantamento": "2026-11-17"
    },
    "barbearia-da-ilha": {
      "nome": "Barbearia da Ilha",
      "cidade": "Vitória - ES",
      "bairro": "Ilha de Santa Maria",
      "google": {
        "nota": 4.9,
        "avaliacoes": 709
      },
      "levantamento": "2026-11-17"
    },
    "euro-barbershop-barbearia": {
      "nome": "Euro BarberShop Barbearia",
      "cidade": "Vitória - ES",
      "bairro": "Bento Ferreira",
      "google": {
        "nota": 5,
        "avaliacoes": 269
      },
      "levantamento": "2026-11-17"
    },
    "makondo-barbershop": {
      "nome": "Makondo Barbershop",
      "cidade": "Vitória - ES",
      "bairro": "Jardim da Penha",
      "google": {
        "nota": 5,
        "avaliacoes": 111
      },
      "levantamento": "2026-11-17"
    },
    "barbearia-costa-leste": {
      "nome": "Barbearia Costa Leste",
      "cidade": "São Paulo - SP",
      "bairro": "Vila Formosa",
      "google": {
        "nota": 5,
        "avaliacoes": 190
      },
      "levantamento": "2026-11-17"
    },
    "mr-guerreiros-barber-club": {
      "nome": "Mr. Guerreiros Barber Club",
      "cidade": "São Paulo - SP",
      "bairro": "Itaquera",
      "google": {
        "nota": 5,
        "avaliacoes": 179
      },
      "levantamento": "2026-11-17"
    },
    "romeu-barbershop": {
      "nome": "Romeu Barbershop",
      "cidade": "Curitiba - PR",
      "bairro": "Centro",
      "google": {
        "nota": 4.8,
        "avaliacoes": 236
      },
      "levantamento": "2026-11-17"
    },
    "nevada-barbearia": {
      "nome": "Nevada Barbearia",
      "cidade": "Sorocaba - SP",
      "bairro": "Centro",
      "google": {
        "nota": 5,
        "avaliacoes": 514
      },
      "levantamento": "2026-11-17"
    },
    "biel-barber-club": {
      "nome": "Biel Barber Club",
      "cidade": "Campina Grande - PB",
      "bairro": "Monte Santo",
      "google": {
        "nota": 5,
        "avaliacoes": 269
      },
      "levantamento": "2026-11-17"
    },
    "honorato-barber-club": {
      "nome": "Honorato Barber Club",
      "cidade": "Campina Grande - PB",
      "bairro": "Catolé",
      "google": {
        "nota": 4.7,
        "avaliacoes": 1068
      },
      "levantamento": "2026-11-17"
    },
    "barbearia-correia": {
      "nome": "Barbearia Correia",
      "cidade": "Petrolina - PE",
      "bairro": "Antonio Cassimiro",
      "google": {
        "nota": 5,
        "avaliacoes": 644
      },
      "levantamento": "2026-11-17"
    },
    "porthos-barbearia": {
      "nome": "Porthos Barbearia",
      "cidade": "Petrolina - PE",
      "bairro": "São José",
      "google": {
        "nota": 5,
        "avaliacoes": 266
      },
      "levantamento": "2026-11-17"
    }
  }
};
