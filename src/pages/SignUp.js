import React, { useState, useEffect } from 'react';
import SignUpForm from '../components/forms/SignUpForm';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import { isObjEmpty } from '../helpers/helpers';
import { loginUser, registerUser } from '../actions/authActions';
import { useHistory } from 'react-router-dom';

export default function SignUp() {

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.auth.loggedIn);
  const history = useHistory();

  useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }



  });



  const register = ({ email, password, firstName, lastName }) => {
    const errors = {};
    setErrors(errors);
    if (!validator.isEmail(email)) {
      errors.email = "El correo electronico es invalido";
    }

    if (!validator.isLength(password, { min: 8, max: 30 })) {
      errors.password = "La clave debe tener entre 8 y 30 caracteres";
    }

    if (validator.isEmpty(firstName)) {
      errors.firstName = "El nombre es obligatorio";
    }

    if (validator.isEmpty(lastName)) {
      errors.lastName = "El nombre es obligatorio";
    }

    if (!isObjEmpty(errors)) {
      setErrors(errors);
      return;
    }

    dispatch(registerUser({ email, password, firstName, lastName }))
      .then(response => {
        dispatch(loginUser({email, password}));
      })
      .catch(err => {
        setErrors({ registerError: err.response.data.message });
      });

  }


  return (

    <Container className="mt-5">
      <Row>
        <Col sm="12" md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
          <Card body>

            {errors.registerError && <Alert variant="danger">{errors.registerError}</Alert>}

            <h3>Crear cuenta</h3><hr></hr>
            <SignUpForm errors={errors} onSubmitCallback={register}></SignUpForm>
            <div className="mt-4">
              <Link to={"/signin"}>Ya tienes una cuenta? Inicia sesion aqui</Link>
            </div>
          </Card>
        </Col>

      </Row>

    </Container>
  )
}
