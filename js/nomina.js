function calcular(){

    var tipo_documento=(document.getElementById('tipo_documento').value)
    var numero_documento=(document.getElementById('numero_documento').value)
    var nombre=(document.getElementById('nombre').value)
    var salario=Number(document.getElementById('salario').value)
    var dias=Number(document.getElementById('dias').value)
    var hed=Number(document.getElementById('hed').value)
    var hen=Number(document.getElementById('hen').value)
    var hefd=Number(document.getElementById('hefd').value)
    var hefn=Number(document.getElementById('hefn').value)
    /*
    Variables de entrada
    Salarios Devengados por el Empleado
    */
    var sueldo = salario / 30 * dias
    document.getElementById ('sueldo').value=sueldo;
}
