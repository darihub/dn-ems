import FormularioEmpleado from "@/components/FormularioEmpleado";
import RutaProtegida from "@/components/RutaProtegida";


export default function PaginaNuevoEmpleado() {
  return(
    <RutaProtegida soloAdmin={true}> 
        <FormularioEmpleado />
    </RutaProtegida>
  );
}