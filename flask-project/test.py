preguntas= [
    [
      "2021-03-04",
      "usuario: daniel12",
      "cliente: DirecTv",
      "intentos: 1",
      "Tiempo: 0`:23``",
      "Puntaje: 0",
      "Incorrectas",
      [
        " -Cuál es el paso a paso para comparar facturas:",
        " -¿Cómo identifico las diferencias entre facturas?",
        " -Los beneficios principales de la comparación de factura son:",
        " -¿Qué información debo indicarle al cliente al momento que me acepte una oferta de Retención Premium?",
        " -¿Qué información debo indicarle al cliente al momento que me acepte una oferta de Retención Premium?",
        " -¿Qué información debo indicarle al cliente al momento que me acepte una oferta de Retención Premium?",
        " -¿Qué información debo indicarle al cliente al momento que me acepte una oferta de Retención Premium?",
        " -¿Qué información debo indicarle al cliente al momento que me acepte una oferta de Retención Premium?",
        " -¿El comparador de facturas solo me muestra información del plan básico y los decodificadores contratados?",
        " -Al momento de cargar una oferta de Retenciones Premium, podemos informarle al cliente de forma proactiva cuando debe llamar a dar de baja los canales",
        " -Por proceso de RVP, si el cliente me solicita la baja de FOX-HBO-HOTPACK, ¿solo puedo ofrecerle descuento en HBO?",
        " -¿A través de la vista principal de comparación de facturas también puedo identificar el método de pago del cliente?",
        " -¿Después de usar el comparador, cómo hago para comparar una nueva factura?",
        " -¿Cuántas facturas puedo comparar al tiempo?",
        " -¿En la opción comparación de factura puedo ver si el cliente tiene descuentos en los paquetes premium?",
        " -¿Al usar el comparador de factura también puedo identificar los pagos efectuados por el cliente?",
        " -Al momento de realizar el proceso de Retención debemos tener en cuenta:",
        " -Camilo se comunica solicitando reducir el costo de su factura, tiene FOX y HBO a precio FULL, cómo no pidió la baja directamente que descuento debo ofrecer",
        " -Ana solicita la baja de HBO, al validar el paquete se lo estan cobrando a full precio, sin embargo, anteriormente tuvo una oferta del 50% de descuento. ¿El asesor que descuento puede ofrecerle?",
        " -¿Las ofertas cargadas a través de ENGAGE se ven reflejadas en el ICX en cuanto tiempo?",
        " -¿Qué datos puedo ver al usar la opción comparación de factura?",
        " -¿Qué datos puedo ver al usar la opción comparación de factura?",
        " -¿Qué datos puedo ver al usar la opción comparación de factura?",
        " -¿Qué datos puedo ver al usar la opción comparación de factura?"
      ],
      "Correctas",
      []
    ]
  ]
textoprueba=["2021-03-04¬usuario: daniel12¬cliente: DirecTv¬intentos: 1¬Tiempo: 0`:23``¬Puntaje: 0¬Incorrectas¬¶> -Cuál es el paso a paso para comparar facturas:> -¿Cómo identifico las diferencias entre facturas?> -Los beneficios principales de la comparación de factura son:> -¿Qué información debo indicarle al cliente al momento que me acepte una oferta de Retención Premium?> -¿Qué información debo indicarle al cliente al momento que me acepte una oferta de Retención Premium?> -¿Qué información debo indicarle al cliente al momento que me acepte una oferta de Retención Premium?> -¿Qué información debo indicarle al cliente al momento que me acepte una oferta de Retención Premium?> -¿Qué información debo indicarle al cliente al momento que me acepte una oferta de Retención Premium?> -¿El comparador de facturas solo me muestra información del plan básico y los decodificadores contratados?> -Al momento de cargar una oferta de Retenciones Premium, podemos informarle al cliente de forma proactiva cuando debe llamar a dar de baja los canales> -Por proceso de RVP, si el cliente me solicita la baja de FOX-HBO-HOTPACK, ¿solo puedo ofrecerle descuento en HBO?> -¿A través de la vista principal de comparación de facturas también puedo identificar el método de pago del cliente?> -¿Después de usar el comparador, cómo hago para comparar una nueva factura?> -¿Cuántas facturas puedo comparar al tiempo?> -¿En la opción comparación de factura puedo ver si el cliente tiene descuentos en los paquetes premium?> -¿Al usar el comparador de factura también puedo identificar los pagos efectuados por el cliente?> -Al momento de realizar el proceso de Retención debemos tener en cuenta:> -Camilo se comunica solicitando reducir el costo de su factura, tiene FOX y HBO a precio FULL, cómo no pidió la baja directamente que descuento debo ofrecer> -Ana solicita la baja de HBO, al validar el paquete se lo estan cobrando a full precio, sin embargo, anteriormente tuvo una oferta del 50% de descuento. ¿El asesor que descuento puede ofrecerle?> -¿Las ofertas cargadas a través de ENGAGE se ven reflejadas en el ICX en cuanto tiempo?> -¿Qué datos puedo ver al usar la opción comparación de factura?> -¿Qué datos puedo ver al usar la opción comparación de factura?> -¿Qué datos puedo ver al usar la opción comparación de factura?> -¿Qué datos puedo ver al usar la opción comparación de factura?¶¬Correctas¬¶¬ ☼"]
preguntas_juntas = ""
preguntas_correctas=""
preguntas_incorrectas=""
preguntas_correctas_filter=[]
preguntas_incorrectas_filter=[]
arreglosinpreguntas = preguntas[:]
for grupo in preguntas:
    for pregunta in grupo[7]:
         preguntas_incorrectas+=">"
         preguntas_incorrectas+=pregunta

    if len(preguntas_incorrectas)>0:
         preguntas_incorrectas="¶"+preguntas_incorrectas+"¶"
    else:
         preguntas_incorrectas+="¶"


    for pregunta in grupo[9]:
         preguntas_correctas+="<"
         preguntas_correctas+=pregunta

    if len(preguntas_correctas)>0:
         preguntas_correctas="¶"+preguntas_correctas+"¶"
    else:
         preguntas_correctas+="¶"
    

    preguntas_correctas_filter.append(preguntas_correctas)
    preguntas_incorrectas_filter.append(preguntas_incorrectas)

for i, grupo in enumerate(arreglosinpreguntas):
     grupo[7]=preguntas_incorrectas_filter[i]
     grupo[9]=preguntas_correctas_filter[i]

     for bloque in grupo:
          bloque_str=[str(item2) for item2 in bloque]
          bloque_str_unido="".join(bloque_str)


texto_final="¬".join(arreglosinpreguntas[0])
texto_final+="¬ ☼"

print (texto_final)
