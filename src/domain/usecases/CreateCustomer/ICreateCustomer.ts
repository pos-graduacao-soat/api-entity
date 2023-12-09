import { Customer } from "../../entities/Customer";
import { CreateCustomerDTO } from "./CreateCustomerDTO";

export interface ICreateCustomerUseCase {
  create: (params: CreateCustomerDTO) => Promise<Customer>
}