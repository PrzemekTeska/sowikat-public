package pl.teskarudz.olkrzycki;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2
@EnableAspectJAutoProxy(proxyTargetClass=true)
public class OlkrzyckiApplication {

    public static void main(String[] args) {
        SpringApplication.run(OlkrzyckiApplication.class, args);
    }

}
