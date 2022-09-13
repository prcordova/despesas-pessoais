import { FormEvent, useState, useContext } from "react";
import Modal from "react-modal"; 
import { api } from "../../services/api";

import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import closeImg from "../../assets/close.svg";

import { Container, RadioBox, TransactionTypeContainer } from "./styles";
import { useTransactions } from "../../hooks/useTransactions";
interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {

const {createTransaction} = useTransactions();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [type, setType] = useState("deposit");

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();
    
   await createTransaction({
      title,
      amount,
      category,
      type,
    })
    setTitle('');
    setAmount(0);
    setCategory('');
    setType('deposit');
    onRequestClose();

  }
  return (
    <Modal
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar Modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar Transação</h2>

        <input
        value={title}
        onChange={(event) =>setTitle( event.target.value)}
        type="text" 
        maxLength={24}
        placeholder="Titulo" />

        <input 
          maxLength={9}
         value={amount}
         onChange={(event) =>setAmount(Number(event.target.value))}
        type="number" 
        placeholder="Valor" />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            isActive={type === "deposit"}
            activeColor="green"
            onClick={() => {
              setType("deposit");
            }}
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            isActive={type === "withdraw"}
            activeColor="red"
            onClick={() => {
              setType("withdraw");
            }}
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>
        <input 
        value={category}
        onChange={(event) =>setCategory( event.target.value)}
        type="text" 
        placeholder="Categoria" />
        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
