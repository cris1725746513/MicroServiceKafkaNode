

const template = '{<head><style>table,th,td { border: 1px solid black;border-collapse: collapse}th,td {padding: 5px; text-align: left}</style></head><center><div style="color: #00377B;font-size:1.5em;margin-bottom:1%; font-family: Calibri;"><p>Aplicación: ${nombreAplicación}</p></div><table style=width="100%"> <tr "border-width: 2px; border-color: #0d0b00; text-align: center;">   <th style="color: #FFFFFF; text-align: center; border: 1px solid #092730; border-left-style: none;background-color: #00377B;">    <strong>Motivo</strong></th> <th style="color: #FFFFFF; text-align: center; border: 1px solid #092730; border-left-style: none;background-color: #00377B;">    <strong>Descripcion del Mensaje</strong></th> </tr><tr style="border-width: 2px; border-color: #0d0b00; text-align: center; background-color: #00377B;"><td   style="color: #000000; text-align: center; border: 1px solid #092730; border-left-style: none;background-color: #FFFFFF;"> ${numeroTicket/incidencia}</td><td style="color: #000000; text-align: center; border: 1px solid #092730; border-left-style: none;background-color: #FFFFFF;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</td></tr><tr style="border-width: 2px; border-color: #0d0b00; text-align: center; background-color: #00377B;"><td style="color: #000000; text-align: center; border: 1px solid #092730; border-left-style: none;background-color: #FFFFFF;">${numeroTicket/incidencia}</td><td style="color: #000000; text-align: center; border: 1px solid #092730; border-left-style: none;background-color: #FFFFFF;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</td></tr></table> <br><div style="color: #00377B;font-size:1em;margin-bottom:1%; font-family: Calibri;"> Informacion adicional: <a href="">direccion plataforma</a></div></center>'
exports.sendMail = function sendMail(msg){

    return template;
}