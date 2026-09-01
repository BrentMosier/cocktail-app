import Menu from "../../components/menu";
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from "@tanstack/react-query";
import { fetchMenu } from "../../server/menu";

//have a store of id's for drinks on the menu
//new api endpoint to get a subset of recipes based on id's
//pass recipes down to Menu component

// boozy - The Beaten Trail (dark rum, amaretto, honey syrup, salt, chocolate bitters)
// sweet - Bees Knees (gin, lemon juice, honey syrup)
// middle - Skeleton Key (bourbon, elderflower, lemon juice, ginger beer)
// virgin - Honey Ginger Fizz (1/2 oz honey, 1/2 oz lemon juice, ginger beer)

const menuIds: string[] = [
    "203e5830-e579-493d-836c-17b720704335",
    "2d8a7549-f8b3-4edb-bcce-ccf1e86e57ca",
    "1331b84c-5e0d-432a-bb97-36871352fe31",
    "d9f67a53-aeb0-410d-960f-f419e29f0435",
];

const menuIdsString = menuIds.join(",");

export default async function Page() {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ["menu", menuIdsString],
        queryFn: () => fetchMenu(menuIdsString),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Menu menuIds={menuIdsString} />
        </HydrationBoundary>
    );
}
