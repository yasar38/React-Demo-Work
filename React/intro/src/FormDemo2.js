import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import alertify from "alertifyjs";
export default class FormDemo2 extends Component {
  state = { email: "", password: "", city: "", description: "" };
  handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    alertify.success(this.state.email + "  veri tabanına kaydedildi!");
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Email Giriniz"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Şifre</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Şifre Giriniz"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Açıklama</Label>
            <Input
              type="textarea"
              name="description"
              id="description"
              placeholder="Açıklama Giriniz"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="city">Şehir</Label>
            <Input
              type="select"
              name="city"
              id="city"
              onChange={this.handleChange}
            >
              <option>Ankara</option>
              <option>İstanbul</option>
              <option>İzmir</option>
              <option>Kayseri</option>
              <option>Giresun</option>
            </Input>
          </FormGroup>
          <Button type="submit">Kaydet</Button>
        </Form>
      </div>
    );
  }
}
