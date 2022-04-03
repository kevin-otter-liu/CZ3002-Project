import { Card, ProgressBar, Button, Stack } from "react-bootstrap";
import { currencyFormatter } from "./formatter";
import { useNavigate } from "react-router";

export default function BudgetCard({
  id,
  name,
  amount,
  max,
  startdate,
  enddate,
}) {
  
  const navigate = useNavigate();
  const classNames = [];
  if (amount > max) {
    classNames.push("bg-danger", "bg-opacity-10");
  } else  {
    classNames.push("bg-light");
  }

  const editBudgetHandler = () => {
    navigate("/utils/budget/form", {
      state: {
        period_start_date: startdate,
        period_end_date: enddate,
        category: name,
        amount: max,
        id: id,
        action: "edit",
      },
    });
  };

  return (
    <Button
      style={{
        "background-color": "transparent",
        "border-color": "transparent",
        "text-transform": "capitalize",
        color: "black",
      }}
      onClick={editBudgetHandler}
    >
      <Card className={classNames.join(" ")}>
        <Card.Body>
          <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
            <div className="me-2">{name}</div>
            <div className="d-flex align-items-baseline">
              {currencyFormatter.format(amount)}
              <span className="text-muted fs-6 ms-1">
                / {currencyFormatter.format(max)}
              </span>
            </div>
          </Card.Title>
          <ProgressBar
            className="rounded-pill"
            variant={getRange(amount, max)}
            min={0}
            max={max}
            now={amount}
          />
        </Card.Body>
      </Card>
    </Button>
  );
}

function getRange(amount, max) {
  const ratio = amount / max;
  if (ratio < 0.5) return "primary";
  if (ratio < 0.75) return "warning";
  return "danger";
}
