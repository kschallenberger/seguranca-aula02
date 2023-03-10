package br.com.cwi.segurancaaula01.service.core;

import br.com.cwi.segurancaaula01.domain.RecuperacaoSenha;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import java.util.Properties;

@Service
public class EnviarEmailRecuperacaoService {

    @Autowired
    private JavaMailSender javaMailSender;

    public void enviaEmail(RecuperacaoSenha recuperacaoSenha) throws MessagingException {
        Session session = criarSessionEmail();

        Message message = new MimeMessage(session);
        message.setFrom(new InternetAddress("cwicrescer24@gmail.com"));
        message.setRecipients(
                Message.RecipientType.TO, InternetAddress.parse(recuperacaoSenha.getUsuario().getEmail()));
        message.setSubject("Recuperação de senha");

        String msg = "<h1>Redefinir senhar</h1><br><br>Acesse: http://localhost:3000/redefinir-senha/"
                .concat(recuperacaoSenha.getHashRecuperacao()
                        .replaceAll("/", "%2F").replaceAll("\\.", "%2E"));

        MimeBodyPart mimeBodyPart = new MimeBodyPart();
        mimeBodyPart.setContent(msg, "text/html; charset=utf-8");

        Multipart multipart = new MimeMultipart();
        multipart.addBodyPart(mimeBodyPart);

        message.setContent(multipart);

        Transport.send(message);
    }

    private Session criarSessionEmail() {
        Properties props = new Properties();

        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.socketFactory.port", 465);
        props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
        props.put("mail.smtp.auth", true);
        props.put("mail.smtp.port", 587);

        Session session = Session.getDefaultInstance(props, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(System.getenv("MAIL_USERNAME"), System.getenv("MAIL_PASSWORD"));
            }
        });

        return session;
    }
}
