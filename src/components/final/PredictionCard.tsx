import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Props {
    coin: "SOLANA" | "ETHEREUM";
    weekly_predictions: number[];
    weekly_dca_strategy: number[];
}

const logo = {
    SOLANA: "https://cdn.iconscout.com/icon/premium/png-256-thumb/solana-8544144-7002700.png",
    ETHEREUM: "https://cdn.freelogovectors.net/wp-content/uploads/2022/05/ethereum_logo_freelogovectors.net_.png"
};

const PredictionCard: React.FC<Props> = ({ coin, weekly_predictions, weekly_dca_strategy }) => {
    return (
        <Card className="w-80 px-4 py-10 flex flex-col items-center bg-[#0f0f0f] rounded-xl justify-center gap-10 shadow-lg">
            <div className="flex flex-col items-center gap-4">
                <div className="flex flex-col items-center gap-4">
                    <img src={logo[coin]} alt={coin} className="w-20 h-20" />
                    <h2 className="text-xl font-semibold">{coin}</h2>
                </div>
                <Table className="w-full text-xl">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center">Prediction</TableHead>
                            <TableHead className="text-center">DCA Strategy</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {weekly_predictions.slice(0, 7).map((prediction, index) => (
                            <TableRow key={index}>
                                <TableCell className="text-center">{prediction.toFixed(2)}</TableCell>
                                <TableCell className="text-center">{weekly_dca_strategy[index].toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </Card>
    );
};

export default PredictionCard;
