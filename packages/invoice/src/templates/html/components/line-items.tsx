import { calculateTotal } from "../../../utils/calculate";
import { formatAmount } from "../../../utils/format";
import type { LineItem } from "../../types";
type Props = {
  lineItems: LineItem[];
  currency: string;
  descriptionLabel: string;
  quantityLabel: string;
  priceLabel: string;
  totalLabel: string;
  includeVAT?: boolean;
};

export function LineItems({
  lineItems,
  currency,
  descriptionLabel,
  quantityLabel,
  priceLabel,
  totalLabel,
  includeVAT = false,
}: Props) {
  return (
    <div className="mt-5">
      <div
        className={`grid ${includeVAT ? "grid-cols-[1.5fr_15%_15%_6%_15%]" : "grid-cols-[1.5fr_15%_15%_15%]"} gap-4 items-end relative group mb-2 w-full border-b border-black pb-1`}
      >
        <div className="text-[11px] text-[#878787] font-mono">
          {descriptionLabel}
        </div>

        <div className="text-[11px] text-[#878787] font-mono">{priceLabel}</div>

        <div className="text-[11px] text-[#878787] font-mono">
          {quantityLabel}
        </div>

        {includeVAT && (
          <div className="text-[11px] text-[#878787] font-mono">VAT</div>
        )}

        <div className="text-[11px] text-[#878787] font-mono text-right">
          {totalLabel}
        </div>
      </div>

      {lineItems.map((item, index) => (
        <div
          key={`line-item-${index.toString()}`}
          className={`grid ${includeVAT ? "grid-cols-[1.5fr_15%_15%_6%_15%]" : "grid-cols-[1.5fr_15%_15%_15%]"} gap-4 items-end relative group mb-2 w-full py-1`}
        >
          <div className="text-xs">{item.name}</div>
          <div className="text-xs">
            {formatAmount({ currency, amount: item.price })}
          </div>
          <div className="text-xs">{item.quantity}</div>
          {includeVAT && <div className="text-xs">{item.vat}%</div>}
          <div className="text-xs text-right">
            {formatAmount({
              currency,
              amount: calculateTotal({
                price: item.price,
                quantity: item.quantity,
                vat: item.vat,
                includeVAT,
              }),
            })}
          </div>
        </div>
      ))}
    </div>
  );
}