import { useMatches } from "react-router"
import { isRouteHandle } from '../lib/isRouteHandle';
import { Breadcrumbs, Text } from "@mantine/core";
import { ChevronRight } from "lucide-react";


export const BreadCrumbHeader = () => {
  const matches = useMatches();

  const routeHandles = matches.map(match => {
    return match.handle
  });

  const filteredRouteHandles = routeHandles.filter(isRouteHandle);

  const theLastRouteHandle = filteredRouteHandles.at(-1)
  
  return (
    <div>
      <Breadcrumbs separator={<ChevronRight className="hidden xs:block" color="#ced4da" size={18} />}>
        <Text size="sm" c={"#868e96"} className="hidden xs:block">
          {theLastRouteHandle?.category}
        </Text>
        <Text size="sm" fw={500}>
          {theLastRouteHandle?.breadcrumb}
        </Text>
      </Breadcrumbs>
    </div>
  )
} 
