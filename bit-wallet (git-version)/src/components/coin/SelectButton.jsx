import { styled } from "@mui/material/styles";

const SelectButton = styled("span")(({ selected }) => ({
  border: "1px solid gold",
  borderRadius: 5,
  padding: "10px 20px",
  fontFamily: "Montserrat",
  cursor: "pointer",
  backgroundColor: selected ? "gold" : "transparent",
  color: selected ? "black" : "white",
  fontWeight: selected ? 700 : 500,
  width: "22%",
  textAlign: "center",
  "&:hover": {
    backgroundColor: "gold",
    color: "black",
  },
}));

const SelectButtonComponent = ({ children, selected, onClick }) => {
  return (
    <SelectButton selected={selected} onClick={onClick}>
      {children}
    </SelectButton>
  );
};

export default SelectButtonComponent;
