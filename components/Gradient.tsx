import { useEffect, useRef } from "react";

import vertexSource from "./glsl/vertex";
import fragmentSource from "./glsl/fragment";

import styles from "../styles/gradient.module.scss";

interface Props {
  blur?: boolean;
}

function _({ blur }: Props) {
  var canvas: HTMLCanvasElement;
  var gl: WebGLRenderingContext | null;
  var time = 0.0;

  var lastFrame = Date.now();
  var thisFrame;

  var timeHandle: WebGLUniformLocation;
  var widthHandle: WebGLUniformLocation;
  var heightHandle: WebGLUniformLocation;

  const ref = useRef() as React.MutableRefObject<HTMLCanvasElement>;

  useEffect(() => {
    init();
  });

  function init() {
    if (ref.current) canvas = ref.current;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize the GL context
    gl = canvas.getContext("webgl");
    if (!gl) {
      console.error("Unable to initialize WebGL.");
    }

    createShader();
    draw();

    window.addEventListener("resize", onWindowResize, false);
  }

  function onWindowResize() {
    if (gl) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(widthHandle, window.innerWidth);
      gl.uniform1f(heightHandle, window.innerHeight);
    }
  }

  //Compile shader and combine with source
  function compileShader(shaderSource: string, shaderType: number) {
    if (gl) {
      var shader = gl.createShader(shaderType) as WebGLShader;
      gl.shaderSource(shader, shaderSource);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw "Shader compile failed with: " + gl.getShaderInfoLog(shader);
      }
      return shader;
    }
    return null;
  }

  //From https://codepen.io/jlfwong/pen/GqmroZ
  //Utility to complain loudly if we fail to find the attribute/uniform
  function getAttribLocation(program: WebGLProgram, name: string) {
    if (gl) {
      var attributeLocation = gl.getAttribLocation(program, name);
      if (attributeLocation === -1) {
        throw "Cannot find attribute " + name + ".";
      }
      return attributeLocation;
    }
    return null;
  }

  function getUniformLocation(program: WebGLProgram, name: string) {
    if (gl) {
      var attributeLocation = gl.getUniformLocation(program, name);
      if (attributeLocation === -1) {
        throw "Cannot find uniform " + name + ".";
      }
      return attributeLocation;
    }
    return null;
  }

  function createShader() {
    if (gl) {
      //Create vertex and fragment shaders
      var vertexShader = compileShader(
        vertexSource,
        gl.VERTEX_SHADER
      ) as WebGLShader;
      var fragmentShader = compileShader(
        fragmentSource,
        gl.FRAGMENT_SHADER
      ) as WebGLShader;

      //Create shader programs
      var program = gl.createProgram() as WebGLProgram;
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);

      gl.useProgram(program);

      //Set up rectangle covering entire canvas
      var vertexData = new Float32Array([
        -1.0,
        1.0, // top left
        -1.0,
        -1.0, // bottom left
        1.0,
        1.0, // top right
        1.0,
        -1.0, // bottom right
      ]);

      //Create vertex buffer
      var vertexDataBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexDataBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);

      // Layout of our data in the vertex buffer
      var positionHandle = getAttribLocation(program, "position") as number;

      gl.enableVertexAttribArray(positionHandle);
      gl.vertexAttribPointer(
        positionHandle,
        2, // position is a vec2 (2 values per component)
        gl.FLOAT, // each component is a float
        false, // don't normalize values
        2 * 4, // two 4 byte float components per vertex (32 bit float is 4 bytes)
        0 // how many bytes inside the buffer to start from
      );

      //Set uniform handle
      timeHandle = getUniformLocation(program, "time") as WebGLUniformLocation;
      widthHandle = getUniformLocation(
        program,
        "width"
      ) as WebGLUniformLocation;
      heightHandle = getUniformLocation(
        program,
        "height"
      ) as WebGLUniformLocation;

      gl.uniform1f(widthHandle, window.innerWidth);
      gl.uniform1f(heightHandle, window.innerHeight);
    }
    return null;
  }

  function draw() {
    //Update time
    thisFrame = Date.now();
    time += (thisFrame - lastFrame) / 1770;
    lastFrame = thisFrame;

    if (gl) {
      //Send uniforms to program
      gl.uniform1f(timeHandle, time);
      //Draw a triangle strip connecting vertices 0-4
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    requestAnimationFrame(draw);
  }

  return (
    <div className={styles.main}>
      <canvas ref={ref} className={styles.main} />
      <div className={styles.grain} />
      {blur && <div className={styles.overlay} />}
    </div>
  );
}

export default _;
