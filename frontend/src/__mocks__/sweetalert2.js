// frontend/src/__mocks__/sweetalert2.js
const Swal = {
    fire: jest.fn(() => Promise.resolve({ isConfirmed: true })),
    mixin: jest.fn(() => Swal),
  };
  
  // Mock constructor
  const SweetAlert2 = jest.fn(() => Swal);
  SweetAlert2.fire = Swal.fire;
  SweetAlert2.mixin = Swal.mixin;
  
  module.exports = SweetAlert2;