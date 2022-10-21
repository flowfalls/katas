import type { Password } from "@prisma/client";
import bcrypt from "bcryptjs";


export type User = {
  id: string
  name: string,
  gender: string,
  age: number,
  email: string
  createdAt: Date
  updatedAt: Date
  location: number
}

export async function getUserById(id: User["id"]) {
  // return prisma.user.findUnique({ where: { id } });
}

export async function checkEmailAlreadyExists(email: User["email"]) {
  const res = await fetch(`http://localhost:8080/user/check-existing-email`, {
    method: "POST",
    body: JSON.stringify({ email }),
  });

  if (res.status === 200) { // a 200 response signified that the email does not exist
    return false;
  }

  return true;
}

export async function createUser(email: User["email"], password: string, name: User["name"], gender: User["gender"], age: User["age"], location: User["location"]) {
  const hashedPassword = await bcrypt.hash(password, 10);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: hashedPassword,
        name: name,
        gender: gender,
        age: age,
        location: location
      })
  };

  const res = await fetch('http://localhost:8080/user/', requestOptions);
  const data = await res.json();

  console.log(res.status);
  console.log(data);
  if (res.status === 201) {
    return {id: data.data.user.id}
  } else {
    return false
  }
}

export async function deleteUserByEmail(email: User["email"]) {
  // return prisma.user.delete({ where: { email } });
}

export async function verifyLogin(
  email: User["email"],
  password: Password["hash"]
) {
  // const userWithPassword = await prisma.user.findUnique({
  //   where: { email },
  //   include: {
  //     password: true,
  //   },
  // });

  // if (!userWithPassword || !userWithPassword.password) {
  //   return null;
  // }

  // const isValid = await bcrypt.compare(
  //   password,
  //   userWithPassword.password.hash
  // );

  // if (!isValid) {
  //   return null;
  // }

  // const { password: _password, ...userWithoutPassword } = userWithPassword;

  //return userWithoutPassword;
}
