import {
    fireEvent,
    getAllByTestId,
    getByTestId,
    render,
    screen,
} from "@testing-library/react";
import App from "./App";

describe("Should Render A Board With 9 Buttons", () => {
    it("Should Render A Board", () => {
        const { getAllByTestId } = render(<App />);
        expect(getAllByTestId("board")).not.toBeNull();
    });

    it("Should Render 9 Buttons", () => {
        const { getAllByRole } = render(<App />);
        expect(getAllByRole("button").length).toBe(9);
    });

    it("All the buttons should initially be empty", () => {
        render(<App />);
        const buttons = screen.getAllByRole("button");
        for (let i = 0; i < buttons.length; i++) {
            expect(buttons[i].textContent).toBe("");
        }
    });
});

describe("Tic Tac Toe Wining", () => {
    it("Should Declare X As Winner", () => {
        render(<App />);
        const buttons = screen.getAllByRole("button");

        fireEvent.click(buttons[0]);
        fireEvent.click(buttons[3]);
        fireEvent.click(buttons[8]);
        fireEvent.click(buttons[1]);
        fireEvent.click(buttons[4]);

        const status = screen.getByTestId("status");
        expect(status.textContent).toBe("Winner: X");
    });

    it("Should Declare O As Winner", () => {
        render(<App />);
        const buttons = screen.getAllByRole("button");

        fireEvent.click(buttons[6]);
        fireEvent.click(buttons[1]);
        fireEvent.click(buttons[5]);
        fireEvent.click(buttons[4]);
        fireEvent.click(buttons[2]);
        fireEvent.click(buttons[7]);

        const status = screen.getByTestId("status");
        expect(status.textContent).toBe("Winner: O");
    });
});

describe("Tic Tac Toe Functional Testing", () => {
    it("Should not change value if the game is over", () => {
        render(<App />);
        const buttons = screen.getAllByRole("button");

        fireEvent.click(buttons[0]);
        fireEvent.click(buttons[3]);
        fireEvent.click(buttons[1]);
        fireEvent.click(buttons[4]);
        fireEvent.click(buttons[2]);

        const status = screen.getByTestId("status");
        expect(status.textContent).toBe("Winner: X");

        fireEvent.click(buttons[7]);
        expect(buttons[7].textContent).toBe("");
    });

    it("Should Alternate Chances after each turn", () => {
        render(<App />);
        const squares = screen.getAllByRole("button");

        fireEvent.click(squares[0]);
        expect(squares[0].textContent).toBe("X");

        fireEvent.click(squares[1]);
        expect(squares[1].textContent).toBe("O");
    });

    it("Should not change value if not null", () => {
        render(<App />);
        const squares = screen.getAllByRole("button");

        fireEvent.click(squares[1]);
        expect(squares[1].textContent).toBe("X");

        fireEvent.click(squares[1]);
        expect(squares[1].textContent).toBe("X");

        fireEvent.click(squares[2]);
        expect(squares[2].textContent).toBe("O");

        fireEvent.click(squares[2]);
        expect(squares[2].textContent).toBe("O");
    });
});
