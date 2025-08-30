import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const Boleto3Module = buildModule("Boleto3Module", (m) => {
  const recipient = m.getAccount(0);
  const owner = m.getAccount(0);

  const boleto3 = m.contract("Boleto3", [recipient, owner]);

  return { boleto3 };
});

export default Boleto3Module;
