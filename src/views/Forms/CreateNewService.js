import { React, useState, useEffect } from "react";
import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
} from "reactstrap";
import { Link } from "react-router-dom";
// import { postWithToken } from "../ReadAPI";
// import moment from "moment";
import { post } from "service/ReadAPI";

export default function CreateNewService() {
  const [button, setButton] = useState(true);
  const [male, setMale] = useState(true);
  const [female, setFemale] = useState(false);
  const [dobError, setDobError] = useState("");
  const [fnerror, setFnError] = useState("");
  const [lnerror, setLnError] = useState("");
  const [joinDateError, setJoinDateError] = useState("");
  const [currentDate, setCurrentDate] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    setButton(true);
    post(
      "/api/v1.0/service",
      {
        serviceName: e.target.serviceName.value,
        description: e.target.description.value,
        price: e.target.price.value,
        imageUrl: e.target.imageUrl.value,
        status: 0,
        companyId: e.target.companyId.value,
        fieldId: e.target.fieldId.value,
      },
    )
      .then((res) => {
        if (res.status === 200) {
          window.location = "/admin/service";
        }
      })
      .catch((err) => {
        console.log(err)
      });
    }

  return (
    <div className="container-createuser-form">
      <Container>
        <h3 class="logo-title">Create New Service</h3>
        <Col md={9}>
          <Form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <FormGroup>
              <Row>
                <Col>
                  <Label>SERVICE NAME</Label>
                </Col>

                <Col md={8}>
                  <Input
                    type="text"
                    name="serviceName"
                    id="serviceName"
                    placeholder="Name"
                  />
                </Col>
              </Row>
            </FormGroup>

            <FormGroup>
              <Row>
                <Col>
                  <Label>DESCRIPTION</Label>
                </Col>

                <Col md={8}>
                  <Input
                    type="text"
                    name="description"
                    id="description"
                    placeholder="description"
                    // onChange={lnerror}
                  />
                  {/* <h6>{lnerror}</h6> */}
                </Col>
              </Row>
            </FormGroup>
            
            <FormGroup>
              <Row>
                <Col>
                  <Label>PRICE</Label>
                </Col>

                <Col md={8}>
                <Input
                    type="number"
                    name="price"
                    id="price"
                    placeholder="price"
                    // onChange={lnerror}
                  />
                  {/* <h6>{joinDateError}</h6> */}
                </Col>
              </Row>
            </FormGroup>

            <FormGroup>
              <Row>
                <Col>
                  <Label>IMAGE</Label>
                </Col>

                <Col md={8}>
                  <Input
                    type="text"
                    name="imageUrl"
                    id="imageUrl"
                    placeholder="imageUrl"
                    // onChange={lnerror}
                  />
                  {/* <h6>{lnerror}</h6> */}
                </Col>
              </Row>
            </FormGroup>
           
            <FormGroup>
              <Row>
                <Col>
                  <Label>companyId</Label>
                </Col>

                <Col md={8}>
                  <Input
                    type="text"
                    name="companyId"
                    id="companyId"
                    placeholder="companyId"
                    // onChange={lnerror}
                  />
                  {/* <h6>{lnerror}</h6> */}
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col>
                  <Label>fieldId</Label>
                </Col>

                <Col md={8}>
                  <Input
                    type="text"
                    name="fieldId"
                    id="fieldId"
                    placeholder="fieldId"
                    // onChange={lnerror}
                  />
                  {/* <h6>{lnerror}</h6> */}
                </Col>
              </Row>
            </FormGroup>
            <div className="btn-container">
              <Button color="danger">Save</Button>
              <Link to="/admin/service">
                <button className="btn-cancel">Cancel</button>
              </Link>
            </div>
          </Form>
        </Col>
      </Container>
    </div>
  );
}