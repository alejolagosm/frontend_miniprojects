const canvas = document.getElementById('canvas');

function main() {
  let width = canvas.clientWidth;
  let height = canvas.clientHeight;
  //Amount of degrees seen from the scene
  const fov = 50;
  const aspect = width / height;
  // Clipping values for planes
  const near = 0.1;
  const far = 2000;
  // Set scene, camara and render
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 1;
  const renderer = new THREE.WebGLRenderer({ canvas });

  renderer.setSize(width, height);

  new THREE.OrbitControls(camera, canvas);

  const scene = new THREE.Scene();
  const loader = new THREE.TextureLoader();

  const texture = loader.load(
    'https://threejs.org/manual/examples/resources/images/equirectangularmaps/tears_of_steel_bridge_2k.jpg',
    () => {
      const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
      rt.fromEquirectangularTexture(renderer, texture);
      scene.background = rt.texture;
    }
  );

  function render() {
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
    renderer.setSize(width, height, false);
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
